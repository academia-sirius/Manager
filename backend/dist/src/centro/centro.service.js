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
exports.CentroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let CentroService = class CentroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(centroId) {
        const centro = await this.prisma.centro.findUnique({ where: { id: centroId } });
        if (!centro)
            throw new common_1.NotFoundException('Centro não encontrado');
        const { senha: _, ...centroSemSenha } = centro;
        return centroSemSenha;
    }
    async updateProfile(centroId, data) {
        if (data.nome) {
            const existing = await this.prisma.centro.findFirst({
                where: { nome: data.nome, NOT: { id: centroId } },
            });
            if (existing)
                throw new common_1.ConflictException('Já existe um centro com este nome');
        }
        if (data.nif) {
            const existing = await this.prisma.centro.findFirst({
                where: { nif: data.nif, NOT: { id: centroId } },
            });
            if (existing)
                throw new common_1.ConflictException('Já existe um centro com este NIF');
        }
        const centro = await this.prisma.centro.update({
            where: { id: centroId },
            data,
        });
        const { senha: _, ...centroSemSenha } = centro;
        return centroSemSenha;
    }
};
exports.CentroService = CentroService;
exports.CentroService = CentroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], CentroService);
//# sourceMappingURL=centro.service.js.map