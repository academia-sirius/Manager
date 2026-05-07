import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  nif?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  localizacao?: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
