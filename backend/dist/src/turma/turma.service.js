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
            include: { turma: true }
        });
        if (!estagiario || estagiario.turmaId !== turmaId) {
            throw new common_1.NotFoundException('Estagiário não encontrado');
        }
        return estagiario;
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
        const { id: _id, turmaId: _tid, turma: _t, createdAt: _ca, ...updateData } = data;
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