import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service.js';
import { TurmaController } from './turma.controller.js';
import { FileParserService } from './file-parser.service.js';

@Module({
  controllers: [TurmaController],
  providers: [TurmaService, FileParserService],
  exports: [TurmaService, FileParserService],
})
export class TurmaModule {}
