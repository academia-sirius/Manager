"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileParserService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = __importStar(require("xlsx"));
const mammoth = __importStar(require("mammoth"));
const pdf = require('pdf-parse');
let FileParserService = class FileParserService {
    async parseFile(file) {
        const mimetype = file.mimetype;
        let text = '';
        if (mimetype.includes('spreadsheet') || mimetype.includes('excel') || mimetype.includes('csv') || file.originalname.endsWith('.csv')) {
            return this.parseExcel(file.buffer);
        }
        else if (mimetype.includes('pdf')) {
            let pdfFunc = pdf;
            if (typeof pdfFunc !== 'function' && pdfFunc && typeof pdfFunc.default === 'function') {
                pdfFunc = pdfFunc.default;
            }
            if (typeof pdfFunc !== 'function') {
                try {
                    const freshPdf = require('pdf-parse/lib/pdf-parse.js');
                    pdfFunc = typeof freshPdf === 'function' ? freshPdf : freshPdf.default;
                }
                catch (e) {
                    const standardPdf = require('pdf-parse');
                    console.log('Inspeção PDF Module:', typeof standardPdf, Object.keys(standardPdf || {}));
                    pdfFunc = typeof standardPdf === 'function' ? standardPdf : standardPdf.default;
                }
            }
            if (typeof pdfFunc !== 'function') {
                throw new Error('O processador de PDF não exporta uma função válida.');
            }
            const data = await pdfFunc(file.buffer);
            text = data.text;
        }
        else if (mimetype.includes('wordprocessingml') || mimetype.includes('officedocument')) {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            text = result.value;
        }
        else if (mimetype.includes('text/plain')) {
            text = file.buffer.toString('utf-8');
        }
        else {
            throw new Error('Formato de arquivo não suportado para extração automática.');
        }
        return this.extractDataFromText(text);
    }
    parseExcel(buffer) {
        const workbook = XLSX.read(buffer, { type: 'buffer', codepage: 65001 });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet, { defval: '' });
    }
    extractDataFromText(text) {
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        const estagiarios = [];
        let currentEst = {};
        lines.forEach(line => {
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('nome:')) {
                if (currentEst.nome)
                    estagiarios.push(currentEst);
                currentEst = { nome: line.split(':')[1]?.trim() };
            }
            else if (lowerLine.includes('tel:') || lowerLine.includes('telefone:')) {
                currentEst.telefone = line.split(':')[1]?.trim();
            }
            else if (lowerLine.includes('email:')) {
                currentEst.email = line.split(':')[1]?.trim();
            }
            else if (lowerLine.includes('classe:')) {
                currentEst.classe = line.split(':')[1]?.trim();
            }
            if (!line.includes(':') && line.length > 5 && line.length < 50) {
                if (!currentEst.nome) {
                    currentEst.nome = line.trim();
                }
            }
        });
        if (currentEst.nome)
            estagiarios.push(currentEst);
        if (estagiarios.length === 0 && lines.length > 0) {
            return lines.map(l => ({ nome: l.trim() }));
        }
        return estagiarios;
    }
};
exports.FileParserService = FileParserService;
exports.FileParserService = FileParserService = __decorate([
    (0, common_1.Injectable)()
], FileParserService);
//# sourceMappingURL=file-parser.service.js.map