import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';
const pdf = require('pdf-parse');

@Injectable()
export class FileParserService {
  async parseFile(file: Express.Multer.File): Promise<any[]> {
    const mimetype = file.mimetype;
    let text = '';

    if (mimetype.includes('spreadsheet') || mimetype.includes('excel') || mimetype.includes('csv') || file.originalname.endsWith('.csv')) {
      return this.parseExcel(file.buffer);
    } else if (mimetype.includes('pdf')) {
      // Tentativa robusta de carregar a função do pdf-parse
      let pdfFunc: any = pdf;
      if (typeof pdfFunc !== 'function' && pdfFunc && typeof pdfFunc.default === 'function') {
        pdfFunc = pdfFunc.default;
      }

      if (typeof pdfFunc !== 'function') {
        // Fallback: tentar require direto no arquivo interno
        try {
          const freshPdf = require('pdf-parse/lib/pdf-parse.js');
          pdfFunc = typeof freshPdf === 'function' ? freshPdf : freshPdf.default;
        } catch (e) {
          // Se falhar o interno, tenta o padrão de novo mas com log de inspeção
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
    } else if (mimetype.includes('wordprocessingml') || mimetype.includes('officedocument')) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    } else if (mimetype.includes('text/plain')) {
      text = file.buffer.toString('utf-8');
    } else {
      // Para imagens, precisaríamos de OCR externo. 
      // Por enquanto, trataremos como erro ou tentaremos ler texto se for possível.
      throw new Error('Formato de arquivo não suportado para extração automática.');
    }

    return this.extractDataFromText(text);
  }

  private parseExcel(buffer: Buffer): any[] {
    const workbook = XLSX.read(buffer, { type: 'buffer', codepage: 65001 }); // UTF-8
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  }

  private extractDataFromText(text: string): any[] {
    // Regex para identificar padrões comuns
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    const estagiarios = [];

    // Tentativa de identificar blocos de estagiários
    // Padrão esperado: Nome, Telefone, etc em linhas próximas
    let currentEst: any = {};
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('nome:')) {
        if (currentEst.nome) estagiarios.push(currentEst);
        currentEst = { nome: line.split(':')[1]?.trim() };
      } else if (lowerLine.includes('tel:') || lowerLine.includes('telefone:')) {
        currentEst.telefone = line.split(':')[1]?.trim();
      } else if (lowerLine.includes('email:')) {
        currentEst.email = line.split(':')[1]?.trim();
      } else if (lowerLine.includes('classe:')) {
        currentEst.classe = line.split(':')[1]?.trim();
      }
      
      // Se a linha parecer apenas um nome (sem labels), mas estivermos num fluxo PDF
      if (!line.includes(':') && line.length > 5 && line.length < 50) {
        if (!currentEst.nome) {
          currentEst.nome = line.trim();
        }
      }
    });

    if (currentEst.nome) estagiarios.push(currentEst);
    
    // Se não achou nada via Regex estruturado, tenta linha por linha (formato simples)
    if (estagiarios.length === 0 && lines.length > 0) {
      return lines.map(l => ({ nome: l.trim() }));
    }

    return estagiarios;
  }
}
