import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Prefixo global da API
  app.setGlobalPrefix('api');

  // Habilitar CORS para permitir que o Frontend (Vercel) acesse a API
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validações automáticas com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Criar pasta de uploads se não existir
  const uploadsDir = join(process.cwd(), 'uploads', 'logos');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  // Servir arquivos estáticos (logos)
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Servidor rodando na porta ${port}`);
}
bootstrap();
