import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto, logoFilename?: string) {
    // Verificar se o email já existe
    const existing = await this.prisma.centro.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Este email já está cadastrado');
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(dto.senha, 10);

    // Criar centro
    const centro = await this.prisma.centro.create({
      data: {
        email: dto.email,
        senha: senhaHash,
        nome: dto.nome,
        tipo: dto.tipo,
        logo: logoFilename || null,
        slogan: dto.slogan || null,
        descricao: dto.descricao || null,
        corPrimaria: dto.corPrimaria || '#6366f1',
        corSecundaria: dto.corSecundaria || '#ec4899',
      },
    });

    return {
      message: 'Conta criada com sucesso!',
      centroId: centro.id,
    };
  }

  async login(dto: LoginDto) {
    // Buscar centro pelo email
    const centro = await this.prisma.centro.findUnique({
      where: { email: dto.email },
    });

    if (!centro) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(dto.senha, centro.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Gerar JWT
    const payload = { sub: centro.id, email: centro.email };
    const token = this.jwtService.sign(payload);

    // Retornar dados sem a senha
    const { senha: _, ...centroSemSenha } = centro;

    return {
      token,
      centro: centroSemSenha,
    };
  }

  async getProfile(userId: number) {
    const centro = await this.prisma.centro.findUnique({
      where: { id: userId },
    });

    if (!centro) {
      throw new UnauthorizedException('Centro não encontrado');
    }

    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }
}
