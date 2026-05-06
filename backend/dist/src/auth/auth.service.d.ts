import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ForgotPasswordDto, VerifyCodeDto, ResetPasswordDto } from './dto/password-reset.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto, logoFilename?: string): Promise<{
        message: string;
        centroId: number;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        centro: {
            email: string;
            nome: string;
            nif: string;
            tipo: string;
            logo: string | null;
            slogan: string | null;
            descricao: string | null;
            localizacao: string | null;
            telefone: string | null;
            createdAt: Date;
            id: number;
        };
    }>;
    getProfile(userId: number): Promise<{
        email: string;
        nome: string;
        nif: string;
        tipo: string;
        logo: string | null;
        slogan: string | null;
        descricao: string | null;
        localizacao: string | null;
        telefone: string | null;
        createdAt: Date;
        id: number;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyCode(dto: VerifyCodeDto): Promise<{
        valid: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private sendResetEmail;
}
