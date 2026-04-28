import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(12, { message: 'A senha deve ter pelo menos 12 caracteres' })
  @Matches(/(?=.*[a-z])/, { message: 'A senha deve conter pelo menos uma letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
  @Matches(/(?=.*\d)/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/(?=.*[@$!%*?&._-])/, { message: 'A senha deve conter pelo menos um caractere especial' })
  senha!: string;

  @IsNotEmpty({ message: 'Nome do centro é obrigatório' })
  @IsString()
  nome!: string;

  @IsNotEmpty({ message: 'Tipo/Área de atuação é obrigatório' })
  @IsString()
  tipo!: string;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  corPrimaria?: string;

  @IsOptional()
  @IsString()
  corSecundaria?: string;
}
