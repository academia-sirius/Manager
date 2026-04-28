"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentroModule = void 0;
const common_1 = require("@nestjs/common");
const centro_controller_js_1 = require("./centro.controller.js");
const centro_service_js_1 = require("./centro.service.js");
let CentroModule = class CentroModule {
};
exports.CentroModule = CentroModule;
exports.CentroModule = CentroModule = __decorate([
    (0, common_1.Module)({
        controllers: [centro_controller_js_1.CentroController],
        providers: [centro_service_js_1.CentroService],
        exports: [centro_service_js_1.CentroService],
    })
], CentroModule);
//# sourceMappingURL=centro.module.js.map