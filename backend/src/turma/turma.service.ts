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
      include: { 
        turma: { include: { centro: true } },
        registrosDiarios: true 
      }
    });

    if (!estagiario || estagiario.turmaId !== turmaId) {
      throw new NotFoundException('Estagiário não encontrado');
    }

    // --- LÓGICA DE AUTOMAÇÃO DA MATRIZ (Escala 0-20 Final) ---
    const getLabel = (nota: number) => {
      if (nota >= 1.3) return 'Excelente';
      if (nota >= 1.0) return 'Bom';
      if (nota >= 0.6) return 'Satisfaz';
      return 'Insatisfaz';
    };

    // Mapeamento de critérios para labels
    const criteriaKeys = [
      'crit1_assiduidade', 'crit2_pontualidade', 'crit3_disciplina', 'crit4_empenho', 'crit5_maturidade',
      'crit6_criatividade', 'crit7_comunicacao', 'crit8_trabalho_equipa', 'crit9_apresentacao', 'crit10_conhecimentos',
      'crit11_autoconfianca', 'crit12_relacao_sup', 'crit13_relacao_col', 'crit14_iniciativa', 'crit15_relatorio'
    ];

    const labels: Record<string, string> = {};
    let somaTotal = 0;
    let menorNota = 2;
    let piorCriterio = '';

    const estAny = estagiario as any;

    criteriaKeys.forEach(key => {
      const nota = estAny[key] || 0;
      labels[key] = getLabel(nota);
      somaTotal += nota;
      if (nota < menorNota) {
        menorNota = nota;
        piorCriterio = key.replace('crit', '').split('_')[1];
      }
    });

    // Gerador de Observações baseado na soma (0-20)
    let obsAutomatica = '';
    if (somaTotal >= 18) {
      obsAutomatica = "Estagiário de excelência, demonstrou alto comprometimento e domínio técnico.";
    } else if (somaTotal >= 10) {
      obsAutomatica = `Desempenho positivo. Recomendamos reforço em ${piorCriterio}.`;
    } else {
      obsAutomatica = "Necessita de maior acompanhamento e desenvolvimento nas competências básicas.";
    }

    return {
      ...estagiario,
      labels,
      mediaFinal: Math.min(20, Math.round(somaTotal)).toString(), 
      observacaoAutomatica: obsAutomatica
    };
  }

  async importEstagiarios(turmaId: number, centroId: number, estagiarios: any[]) {
    const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) throw new NotFoundException('Turma não encontrada');
    if (turma.centroId !== centroId) throw new ForbiddenException('Acesso negado');

    const mapped = estagiarios.map(e => {
      // Helper para converter datas do Excel (números) para string legível
      const formatExcelDate = (val: any) => {
        if (typeof val === 'number') {
          // Excel base date is 1899-12-30
          const date = new Date(Math.round((val - 25569) * 86400 * 1000));
          return date.toISOString().split('T')[0];
        }
        return String(val || '');
      };

      const data: any = {
        nome: String(e.nome || ''),
        email: String(e.email || ''),
        telefone: e.telefone ? String(e.telefone) : null,
        classe: String(e.classe || e.dadosEscolares || ''),
        dataInicio: formatExcelDate(e.dataInicio),
        dataFim: formatExcelDate(e.dataFim || e.dataTermino),
        totalHoras: String(e.totalHoras || ''),
        turmaId
      };

      // Helper para converter notas de 0-20 para 0-3
      const mapToScale = (nota: any) => {
        const val = parseFloat(nota);
        if (isNaN(val)) return 1; // Padrão Satisfaz
        if (val >= 18) return 3;
        if (val >= 14) return 2;
        if (val >= 10) return 1;
        return 0;
      };

      // Mapeamento de Notas (se existirem no formato aninhado ou flat)
      const n = e.notas || {};
      data.crit1_assiduidade = mapToScale(n.assiduidade || e.assiduidade);
      data.crit2_pontualidade = mapToScale(n.pontualidade || e.pontualidade);
      data.crit3_disciplina = mapToScale(n.disciplina || e.disciplina);
      data.crit4_empenho = mapToScale(n.empenho || e.empenho);
      data.crit5_maturidade = mapToScale(n.maturidade || e.maturidade);
      data.crit6_criatividade = mapToScale(n.criatividade || e.criatividade);
      data.crit7_comunicacao = mapToScale(n.comunicacao || e.comunicacao);
      data.crit8_trabalho_equipa = mapToScale(n.trabalhoEquipa || e.trabalho_equipa || e.trabalhoEquipa);
      data.crit9_apresentacao = mapToScale(n.apresentacao || e.apresentacao);
      data.crit10_conhecimentos = mapToScale(n.conhecimentosTecnicos || e.conhecimentos);
      data.crit11_autoconfianca = mapToScale(n.autoconfianca || e.autoconfianca);
      data.crit12_relacao_sup = mapToScale(n.relacaoSuperiores || e.relacao_sup);
      data.crit13_relacao_col = mapToScale(n.relacaoColegas || e.relacao_col);
      data.crit14_iniciativa = mapToScale(n.iniciativa || e.iniciativa);
      data.crit15_relatorio = mapToScale(n.relatorioEstagio || e.relatorio);

      return data;
    });

    const created = await this.prisma.$transaction(
      mapped.map(data => this.prisma.estagiario.create({ data }))
    );

    return { count: created.length };
  }

  async addRegistroDiario(estagiarioId: number, centroId: number, data: any) {
    const estagiario = await this.prisma.estagiario.findUnique({
      where: { id: estagiarioId },
      include: { turma: true }
    });
    if (!estagiario || estagiario.turma.centroId !== centroId) {
      throw new ForbiddenException('Acesso negado');
    }

    return this.prisma.registroDiario.create({
      data: { ...data, estagiarioId }
    });
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

    const { 
      id: _id, 
      turmaId: _tid, 
      turma: _t, 
      createdAt: _ca, 
      labels: _l, 
      mediaFinal: _mf, 
      observacaoAutomatica: _oa,
      registrosDiarios: _rd,
      ...updateData 
    } = data;

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
