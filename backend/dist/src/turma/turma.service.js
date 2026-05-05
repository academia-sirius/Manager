"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let TurmaService = class TurmaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(centroId) {
        return this.prisma.turma.findMany({
            where: { centroId },
            include: {
                _count: { select: { estagiarios: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, centroId) {
        const turma = await this.prisma.turma.findUnique({
            where: { id },
            include: {
                estagiarios: { orderBy: { createdAt: 'asc' } },
                _count: { select: { estagiarios: true } },
            },
        });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        return turma;
    }
    async create(centroId, data) {
        return this.prisma.turma.create({
            data: { ...data, centroId },
        });
    }
    async remove(id, centroId) {
        const turma = await this.prisma.turma.findUnique({ where: { id } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.estagiario.deleteMany({ where: { turmaId: id } });
        return this.prisma.turma.delete({ where: { id } });
    }
    async addEstagiario(turmaId, centroId, data) {
        const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.estagiario.create({ data: { ...data, turmaId } });
    }
    async findEstagiario(turmaId, estagiarioId, centroId) {
        const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        const estagiario = await this.prisma.estagiario.findUnique({
            where: { id: estagiarioId },
            include: {
                turma: { include: { centro: true } },
                registrosDiarios: true
            }
        });
        if (!estagiario || estagiario.turmaId !== turmaId) {
            throw new common_1.NotFoundException('Estagiário não encontrado');
        }
        const getLabel = (nota) => {
            if (nota >= 1.3)
                return 'Excelente';
            if (nota >= 1.0)
                return 'Bom';
            if (nota >= 0.6)
                return 'Satisfaz';
            return 'Insatisfaz';
        };
        const criteriaKeys = [
            'crit1_assiduidade', 'crit2_pontualidade', 'crit3_disciplina', 'crit4_empenho', 'crit5_maturidade',
            'crit6_criatividade', 'crit7_comunicacao', 'crit8_trabalho_equipa', 'crit9_apresentacao', 'crit10_conhecimentos',
            'crit11_autoconfianca', 'crit12_relacao_sup', 'crit13_relacao_col', 'crit14_iniciativa', 'crit15_relatorio'
        ];
        const labels = {};
        let somaTotal = 0;
        let menorNota = 2;
        let piorCriterio = '';
        const estAny = estagiario;
        criteriaKeys.forEach(key => {
            const nota = estAny[key] || 0;
            labels[key] = getLabel(nota);
            somaTotal += nota;
            if (nota < menorNota) {
                menorNota = nota;
                piorCriterio = key.replace('crit', '').split('_')[1];
            }
        });
        let obsAutomatica = '';
        if (somaTotal >= 18) {
            obsAutomatica = "Estagiário de excelência, demonstrou alto comprometimento e domínio técnico.";
        }
        else if (somaTotal >= 10) {
            obsAutomatica = `Desempenho positivo. Recomendamos reforço em ${piorCriterio}.`;
        }
        else {
            obsAutomatica = "Necessita de maior acompanhamento e desenvolvimento nas competências básicas.";
        }
        return {
            ...estagiario,
            labels,
            mediaFinal: Math.min(20, Math.round(somaTotal)).toString(),
            observacaoAutomatica: obsAutomatica
        };
    }
    async importEstagiarios(turmaId, centroId, estagiarios) {
        const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        const mapped = estagiarios.map(e => {
            const formatExcelDate = (val) => {
                if (typeof val === 'number') {
                    const date = new Date(Math.round((val - 25569) * 86400 * 1000));
                    return date.toISOString().split('T')[0];
                }
                return String(val || '');
            };
            const data = {
                nome: String(e.nome || ''),
                email: String(e.email || ''),
                telefone: e.telefone ? String(e.telefone) : null,
                classe: String(e.classe || e.dadosEscolares || ''),
                dataInicio: formatExcelDate(e.dataInicio),
                dataFim: formatExcelDate(e.dataFim || e.dataTermino),
                totalHoras: String(e.totalHoras || ''),
                turmaId
            };
            const mapToScale = (nota) => {
                const val = parseFloat(nota);
                if (isNaN(val))
                    return 1;
                if (val >= 18)
                    return 3;
                if (val >= 14)
                    return 2;
                if (val >= 10)
                    return 1;
                return 0;
            };
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
        const created = await this.prisma.$transaction(mapped.map(data => this.prisma.estagiario.create({ data })));
        return { count: created.length };
    }
    async addRegistroDiario(estagiarioId, centroId, data) {
        const estagiario = await this.prisma.estagiario.findUnique({
            where: { id: estagiarioId },
            include: { turma: true }
        });
        if (!estagiario || estagiario.turma.centroId !== centroId) {
            throw new common_1.ForbiddenException('Acesso negado');
        }
        return this.prisma.registroDiario.create({
            data: { ...data, estagiarioId }
        });
    }
    async updateEstagiario(turmaId, estagiarioId, centroId, data) {
        const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        const estagiario = await this.prisma.estagiario.findUnique({
            where: { id: estagiarioId }
        });
        if (!estagiario || estagiario.turmaId !== turmaId) {
            throw new common_1.NotFoundException('Estagiário não encontrado');
        }
        const { id: _id, turmaId: _tid, turma: _t, createdAt: _ca, labels: _l, mediaFinal: _mf, observacaoAutomatica: _oa, registrosDiarios: _rd, ...updateData } = data;
        return this.prisma.estagiario.update({
            where: { id: estagiarioId },
            data: updateData
        });
    }
    async removeEstagiario(turmaId, estagiarioId, centroId) {
        const turma = await this.prisma.turma.findUnique({ where: { id: turmaId } });
        if (!turma)
            throw new common_1.NotFoundException('Turma não encontrada');
        if (turma.centroId !== centroId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.estagiario.delete({ where: { id: estagiarioId } });
    }
};
exports.TurmaService = TurmaService;
exports.TurmaService = TurmaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], TurmaService);
//# sourceMappingURL=turma.service.js.map