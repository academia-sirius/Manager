import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { TurmaService } from './turma.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('turmas')
@UseGuards(JwtAuthGuard)
export class TurmaController {
  constructor(private turmaService: TurmaService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.turmaService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.turmaService.findOne(id, req.user.id);
  }

  @Post()
  async create(
    @Request() req: any,
    @Body() data: { nome: string; duracao: string; tipoFormacao: string; responsavel: string },
  ) {
    return this.turmaService.create(req.user.id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.turmaService.remove(id, req.user.id);
  }

  @Post(':id/estagiarios')
  async addEstagiario(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
    @Body() data: any,
  ) {
    return this.turmaService.addEstagiario(id, req.user.id, data);
  }

  @Get(':id/estagiarios/:estagiarioId')
  async findEstagiario(
    @Param('id', ParseIntPipe) id: number,
    @Param('estagiarioId', ParseIntPipe) estagiarioId: number,
    @Request() req: any,
  ) {
    return this.turmaService.findEstagiario(id, estagiarioId, req.user.id);
  }

  @Patch(':id/estagiarios/:estagiarioId')
  async updateEstagiario(
    @Param('id', ParseIntPipe) id: number,
    @Param('estagiarioId', ParseIntPipe) estagiarioId: number,
    @Request() req: any,
    @Body() data: any,
  ) {
    return this.turmaService.updateEstagiario(id, estagiarioId, req.user.id, data);
  }

  @Delete(':id/estagiarios/:estagiarioId')
  async removeEstagiario(
    @Param('id', ParseIntPipe) id: number,
    @Param('estagiarioId', ParseIntPipe) estagiarioId: number,
    @Request() req: any,
  ) {
    return this.turmaService.removeEstagiario(id, estagiarioId, req.user.id);
  }
}
