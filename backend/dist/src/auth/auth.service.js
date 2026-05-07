"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const nodemailer = __importStar(require("nodemailer"));
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(dto, logoFilename) {
        const existingEmail = await this.prisma.centro.findUnique({ where: { email: dto.email } });
        if (existingEmail)
            throw new common_1.ConflictException('Este email já está cadastrado');
        const existingNome = await this.prisma.centro.findUnique({ where: { nome: dto.nome } });
        if (existingNome)
            throw new common_1.ConflictException('Já existe um centro registado com este nome');
        const existingNif = await this.prisma.centro.findUnique({ where: { nif: dto.nif } });
        if (existingNif)
            throw new common_1.ConflictException('Já existe um centro registado com este NIF');
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
    async login(dto) {
        const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
        if (!centro)
            throw new common_1.UnauthorizedException('Email ou senha incorretos');
        const senhaValida = await bcrypt.compare(dto.senha, centro.senha);
        if (!senhaValida)
            throw new common_1.UnauthorizedException('Email ou senha incorretos');
        const payload = { sub: centro.id, email: centro.email };
        const token = this.jwtService.sign(payload);
        const { senha: _, ...centroSemSenha } = centro;
        return { token, centro: centroSemSenha };
    }
    async getProfile(userId) {
        const centro = await this.prisma.centro.findUnique({ where: { id: userId } });
        if (!centro)
            throw new common_1.UnauthorizedException('Centro não encontrado');
        const { senha: _, ...centroSemSenha } = centro;
        return centroSemSenha;
    }
    async updateProfile(userId, dto, logoFilename) {
        const centro = await this.prisma.centro.findUnique({ where: { id: userId } });
        if (!centro)
            throw new common_1.UnauthorizedException('Centro não encontrado');
        const dataToUpdate = { ...dto };
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
    async forgotPassword(dto) {
        const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
        if (!centro) {
            return { message: 'Se o email estiver registado, receberá um código de verificação.' };
        }
        await this.prisma.passwordResetToken.updateMany({
            where: { email: dto.email, used: false },
            data: { used: true },
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.prisma.passwordResetToken.create({
            data: { email: dto.email, code, expiresAt },
        });
        await this.sendResetEmail(dto.email, centro.nome, code);
        return { message: 'Se o email estiver registado, receberá um código de verificação.' };
    }
    async verifyCode(dto) {
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
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        return { valid: true, message: 'Código válido' };
    }
    async resetPassword(dto) {
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
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const centro = await this.prisma.centro.findUnique({ where: { email: dto.email } });
        if (!centro)
            throw new common_1.NotFoundException('Centro não encontrado');
        const senhaHash = await bcrypt.hash(dto.novaSenha, 10);
        await this.prisma.centro.update({
            where: { email: dto.email },
            data: { senha: senhaHash },
        });
        await this.prisma.passwordResetToken.update({
            where: { id: token.id },
            data: { used: true },
        });
        return { message: 'Senha alterada com sucesso!' };
    }
    async sendResetEmail(email, nome, code) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map