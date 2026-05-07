import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ForgotPasswordDto, VerifyCodeDto, ResetPasswordDto } from './dto/password-reset.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ─── Signup ────────────────────────────────────────────────────────────────
  async signup(dto: SignupDto, logoFilename?: string) {
    // Verificar email duplicado
    const existingEmail = await this.prisma.centro.findUnique({ where: { email: dto.email } });
    if (existingEmail) throw new ConflictException('Este email já está cadastrado');

    // Verificar nome duplicado
    const existingNome = await this.prisma.centro.findUnique({ where: { nome: dto.nome } });
    if (existingNome) throw new ConflictException('Já existe um centro registado com este nome');

    // Verificar NIF duplicado
    const existingNif = await this.prisma.centro.findUnique({ where: { nif: dto.nif } });
    if (existingNif) throw new ConflictException('Já existe um centro registado com este NIF');

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const centro = await this.prisma.centro.create({
      data: {
        email: dto.email,
        senha: senhaHash,
        nome: dto.nome,
        nif: dto.nif,
        tipo: dto.tipo,
        logo: logoFilename || null,
        slogan: dto.slogan || null,
        descricao: dto.descricao || null,
        localizacao: dto.localizacao || null,
        telefone: dto.telefone || null,
      },
    });

    return { message: 'Conta criada com sucesso!', centroId: centro.id };
  }

  // ─── Login ─────────────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
    if (!centro) throw new UnauthorizedException('Email ou senha incorretos');

    const senhaValida = await bcrypt.compare(dto.senha, centro.senha);
    if (!senhaValida) throw new UnauthorizedException('Email ou senha incorretos');

    const payload = { sub: centro.id, email: centro.email };
    const token = this.jwtService.sign(payload);
    const { senha: _, ...centroSemSenha } = centro;

    return { token, centro: centroSemSenha };
  }

  // ─── Perfil ────────────────────────────────────────────────────────────────
  async getProfile(userId: number) {
    const centro = await this.prisma.centro.findUnique({ where: { id: userId } });
    if (!centro) throw new UnauthorizedException('Centro não encontrado');
    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }

  async updateProfile(userId: number, dto: any, logoFilename?: string) {
    const centro = await this.prisma.centro.findUnique({ where: { id: userId } });
    if (!centro) throw new UnauthorizedException('Centro não encontrado');

    const dataToUpdate: any = { ...dto };
    if (logoFilename) {
      dataToUpdate.logo = logoFilename;
    }

    const updated = await this.prisma.centro.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    const { senha: _, ...centroSemSenha } = updated;
    return centroSemSenha;
  }

  // ─── Forgot Password ───────────────────────────────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
    // Não revelar se o email existe ou não (segurança)
    if (!centro) {
      return { message: 'Se o email estiver registado, receberá um código de verificação.' };
    }

    // Invalidar tokens anteriores para este email
    await this.prisma.passwordResetToken.updateMany({
      where: { email: dto.email, used: false },
      data: { used: true },
    });

    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await this.prisma.passwordResetToken.create({
      data: { email: dto.email, code, expiresAt },
    });

    // Enviar email
    await this.sendResetEmail(dto.email, centro.nome, code);

    return { message: 'Se o email estiver registado, receberá um código de verificação.' };
  }

  // ─── Verify Code ───────────────────────────────────────────────────────────
  async verifyCode(dto: VerifyCodeDto) {
    const token = await this.prisma.passwordResetToken.findFirst({
      where: {
        email: dto.email,
        code: dto.code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!token) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    return { valid: true, message: 'Código válido' };
  }

  // ─── Reset Password ────────────────────────────────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    const token = await this.prisma.passwordResetToken.findFirst({
      where: {
        email: dto.email,
        code: dto.code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!token) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
    if (!centro) throw new NotFoundException('Centro não encontrado');

    const senhaHash = await bcrypt.hash(dto.novaSenha, 10);

    await this.prisma.centro.update({
      where: { email: dto.email },
      data: { senha: senhaHash },
    });

    // Marcar token como usado
    await this.prisma.passwordResetToken.update({
      where: { id: token.id },
      data: { used: true },
    });

    return { message: 'Senha alterada com sucesso!' };
  }

  // ─── Email Helper ──────────────────────────────────────────────────────────
  private async sendResetEmail(email: string, nome: string, code: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('================================================================');
      console.log(`[TESTE LOCAL] Email de recuperação para: ${email}`);
      console.log(`[TESTE LOCAL] Código de recuperação: ${code}`);
      console.log('================================================================');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Manager — Código de Recuperação de Senha',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #6366f1; text-align: center;">🔐 Recuperação de Senha</h2>
          <p>Olá, <strong>${nome}</strong>!</p>
          <p>Recebemos um pedido de recuperação de senha para a sua conta.</p>
          <p>O seu código de verificação é:</p>
          <div style="background: #1e293b; border: 2px solid #6366f1; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 2.5rem; font-weight: 800; letter-spacing: 8px; color: #6366f1;">${code}</span>
          </div>
          <p style="color: #94a3b8; font-size: 0.9rem;">⏱️ Este código expira em <strong>15 minutos</strong>.</p>
          <p style="color: #94a3b8; font-size: 0.85rem;">Se não solicitou este código, ignore este email.</p>
        </div>
      `,
    });
  }
}
