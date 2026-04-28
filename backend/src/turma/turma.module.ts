import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service.js';
import { TurmaController } from './turma.controller.js';

@Module({
  controllers: [TurmaController],
  providers: [TurmaService],
  exports: [TurmaService],
})
export class TurmaModule {}
