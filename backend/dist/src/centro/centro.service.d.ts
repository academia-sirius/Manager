import { PrismaService } from '../prisma/prisma.service.js';
export declare class CentroService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(centroId: number): Promise<{
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
    updateProfile(centroId: number, data: Partial<{
        nome: string;
        tipo: string;
        slogan: string;
        descricao: string;
        corPrimaria: string;
        corSecundaria: string;
    }>): Promise<{
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
