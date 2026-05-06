import { PrismaService } from '../prisma/prisma.service.js';
export declare class CentroService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(centroId: number): Promise<{
        email: string;
        nome: string;
        nif: string;
        tipo: string;
        slogan: string | null;
        descricao: string | null;
        localizacao: string | null;
        telefone: string | null;
        id: number;
        logo: string | null;
        createdAt: Date;
    }>;
    updateProfile(centroId: number, data: Partial<{
        nome: string;
        nif: string;
        tipo: string;
        slogan: string;
        descricao: string;
        localizacao: string;
        telefone: string;
    }>): Promise<{
        email: string;
        nome: string;
        nif: string;
        tipo: string;
        slogan: string | null;
        descricao: string | null;
        localizacao: string | null;
        telefone: string | null;
        id: number;
        logo: string | null;
        createdAt: Date;
    }>;
}
