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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const turma_service_js_1 = require("./turma.service.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const file_parser_service_js_1 = require("./file-parser.service.js");
let TurmaController = class TurmaController {
    turmaService;
    fileParser;
    constructor(turmaService, fileParser) {
        this.turmaService = turmaService;
        this.fileParser = fileParser;
    }
    async findAll(req) {
        return this.turmaService.findAll(req.user.id);
    }
    async findOne(id, req) {
        return this.turmaService.findOne(id, req.user.id);
    }
    async create(req, data) {
        return this.turmaService.create(req.user.id, data);
    }
    async remove(id, req) {
        return this.turmaService.remove(id, req.user.id);
    }
    async update(id, req, data) {
        return this.turmaService.update(id, req.user.id, data);
    }
    async addEstagiario(id, req, data) {
        return this.turmaService.addEstagiario(id, req.user.id, data);
    }
    async importEstagiarios(id, req, data, file) {
        let list = [];
        if (file) {
            list = await this.fileParser.parseFile(file);
        }
        else {
            list = typeof data.estagiarios === 'string'
                ? JSON.parse(data.estagiarios)
                : data.estagiarios;
        }
        return this.turmaService.importEstagiarios(id, req.user.id, list);
    }
    async addRegistro(_id, estagiarioId, req, data) {
        return this.turmaService.addRegistroDiario(estagiarioId, req.user.id, data);
    }
    async findEstagiario(id, estagiarioId, req) {
        return this.turmaService.findEstagiario(id, estagiarioId, req.user.id);
    }
    async updateEstagiario(id, estagiarioId, req, data) {
        return this.turmaService.updateEstagiario(id, estagiarioId, req.user.id, data);
    }
    async removeEstagiario(id, estagiarioId, req) {
        return this.turmaService.removeEstagiario(id, estagiarioId, req.user.id);
    }
};
exports.TurmaController = TurmaController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/estagiarios'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "addEstagiario", null);
__decorate([
    (0, common_1.Post)(':id/estagiarios/import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "importEstagiarios", null);
__decorate([
    (0, common_1.Post)(':id/estagiarios/:estagiarioId/registros'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('estagiarioId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "addRegistro", null);
__decorate([
    (0, common_1.Get)(':id/estagiarios/:estagiarioId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('estagiarioId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "findEstagiario", null);
__decorate([
    (0, common_1.Patch)(':id/estagiarios/:estagiarioId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('estagiarioId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "updateEstagiario", null);
__decorate([
    (0, common_1.Delete)(':id/estagiarios/:estagiarioId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('estagiarioId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TurmaController.prototype, "removeEstagiario", null);
exports.TurmaController = TurmaController = __decorate([
    (0, common_1.Controller)('turmas'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [turma_service_js_1.TurmaService,
        file_parser_service_js_1.FileParserService])
], TurmaController);
//# sourceMappingURL=turma.controller.js.map