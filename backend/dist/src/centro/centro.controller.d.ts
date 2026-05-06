import { CentroService } from './centro.service.js';
export declare class CentroController {
    private centroService;
    constructor(centroService: CentroService);
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, body: Partial<{
        nome: string;
        tipo: string;
        slogan: string;
        descricao: string;
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
