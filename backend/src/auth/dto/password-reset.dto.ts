import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email!: string;
}

export class VerifyCodeDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(6, 6, { message: 'O código deve ter 6 dígitos' })
  code!: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(6, 6, { message: 'O código deve ter 6 dígitos' })
  code!: string;

  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @IsString()
  novaSenha!: string;
}
