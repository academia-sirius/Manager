import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CentroService {
  constructor(private prisma: PrismaService) {}

  async getProfile(centroId: number) {
    const centro = await this.prisma.centro.findUnique({
      where: { id: centroId },
    });

    if (!centro) {
      throw new NotFoundException('Centro não encontrado');
    }

    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }

  async updateProfile(centroId: number, data: Partial<{ nome: string; tipo: string; slogan: string; descricao: string; corPrimaria: string; corSecundaria: string }>) {
    const centro = await this.prisma.centro.update({
      where: { id: centroId },
      data,
    });

    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }
}
