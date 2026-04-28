import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async findAll(centroId: number) {
    return this.prisma.turma.findMany({
      where: { centroId },
      include: {
        _count: { select: { estagiarios: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, centroId: number) {
    const turma = await this.prisma.turma.findUnique({
      where: { id },
      include: {
        estagiarios: { orderBy: { createdAt: 'asc' } },
        _count: { select: { estagiarios: true } },
      },
    });

    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    return turma;
  }

  async create(
    centroId: number,
    data: { nome: string; duracao: string; tipoFormacao: string; responsavel: string },
  ) {
    return this.prisma.turma.create({
      data: { ...data, centroId },
    });
  }

  async remove(id: number, centroId: number) {
    const turma = await this.prisma.turma.findUnique({ where: { id } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    await this.prisma.estagiario.deleteMany({ where: { turmaId: id } });
    return this.prisma.turma.delete({ where: { id } });
  }

  async addEstagiario(
    turmaId: number,
    centroId: number,
    data: { nome: string; email?: string; telefone?: string },
  ) {
    const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    return this.prisma.estagiario.create({ data: { ...data, turmaId } });
  }

  async findEstagiario(turmaId: number, estagiarioId: number, centroId: number) {
    const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    const estagiario = await this.prisma.estagiario.findUnique({
      where: { id: estagiarioId },
      include: { turma: true }
    });

    if (!estagiario || estagiario.turmaId !== turmaId) {
      throw new NotFoundException('Estagiário não encontrado');
    }

    return estagiario;
  }

  async updateEstagiario(
    turmaId: number,
    estagiarioId: number,
    centroId: number,
    data: any,
  ) {
    const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    const estagiario = await this.prisma.estagiario.findUnique({
      where: { id: estagiarioId }
    });

    if (!estagiario || estagiario.turmaId !== turmaId) {
      throw new NotFoundException('Estagiário não encontrado');
    }

    // Sanitize data to remove fields that shouldn't be updated manually or don't exist in schema
    const { id: _id, turmaId: _tid, turma: _t, createdAt: _ca, ...updateData } = data;

    return this.prisma.estagiario.update({
      where: { id: estagiarioId },
      data: updateData
    });
  }

  async removeEstagiario(turmaId: number, estagiarioId: number, centroId: number) {
    const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    return this.prisma.estagiario.delete({ where: { id: estagiarioId } });
  }
}
