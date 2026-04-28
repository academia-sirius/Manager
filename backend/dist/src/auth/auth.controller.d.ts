import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto, file?: Express.Multer.File): Promise<{
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
    getProfile(req: any): Promise<{
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
    logout(): Promise<{
        message: string;
    }>;
}
