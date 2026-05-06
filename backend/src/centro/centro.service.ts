import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CentroService {
  constructor(private prisma: PrismaService) {}

  async getProfile(centroId: number) {
    const centro = await this.prisma.centro.findUnique({ where: { id: centroId } });
    if (!centro) throw new NotFoundException('Centro não encontrado');
    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }

  async updateProfile(
    centroId: number,
    data: Partial<{
      nome: string;
      nif: string;
      tipo: string;
      slogan: string;
      descricao: string;
      localizacao: string;
      telefone: string;
    }>,
  ) {
    // Verificar unicidade de nome se estiver a ser alterado
    if (data.nome) {
      const existing = await this.prisma.centro.findFirst({
        where: { nome: data.nome, NOT: { id: centroId } },
      });
      if (existing) throw new ConflictException('Já existe um centro com este nome');
    }

    // Verificar unicidade de NIF se estiver a ser alterado
    if (data.nif) {
      const existing = await this.prisma.centro.findFirst({
        where: { nif: data.nif, NOT: { id: centroId } },
      });
      if (existing) throw new ConflictException('Já existe um centro com este NIF');
    }

    const centro = await this.prisma.centro.update({
      where: { id: centroId },
      data,
    });

    const { senha: _, ...centroSemSenha } = centro;
    return centroSemSenha;
  }
}
