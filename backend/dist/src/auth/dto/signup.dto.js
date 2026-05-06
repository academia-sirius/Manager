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
exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
class SignupDto {
    email;
    senha;
    nome;
    nif;
    tipo;
    slogan;
    descricao;
    localizacao;
    telefone;
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória' }),
    (0, class_validator_1.MinLength)(12, { message: 'A senha deve ter pelo menos 12 caracteres' }),
    (0, class_validator_1.Matches)(/(?=.*[a-z])/, { message: 'A senha deve conter pelo menos uma letra minúscula' }),
    (0, class_validator_1.Matches)(/(?=.*[A-Z])/, { message: 'A senha deve conter pelo menos uma letra maiúscula' }),
    (0, class_validator_1.Matches)(/(?=.*\d)/, { message: 'A senha deve conter pelo menos um número' }),
    (0, class_validator_1.Matches)(/(?=.*[@$!%*?&._-])/, { message: 'A senha deve conter pelo menos um caractere especial' }),
    __metadata("design:type", String)
], SignupDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome do centro é obrigatório' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'NIF é obrigatório' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "nif", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tipo/Área de atuação é obrigatório' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "slogan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "localizacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "telefone", void 0);
//# sourceMappingURL=signup.dto.js.map