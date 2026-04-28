import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
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
            tipo: string;
            slogan: string | null;
            descricao: string | null;
            corPrimaria: string | null;
            corSecundaria: string | null;
            id: number;
            logo: string | null;
            createdAt: Date;
        };
    }>;
    getProfile(userId: number): Promise<{
        email: string;
        nome: string;
        tipo: string;
        slogan: string | null;
        descricao: string | null;
        corPrimaria: string | null;
        corSecundaria: string | null;
        id: number;
        logo: string | null;
        createdAt: Date;
    }>;
}
