import { Module } from '@nestjs/common';
import { CentroController } from './centro.controller.js';
import { CentroService } from './centro.service.js';

@Module({
  controllers: [CentroController],
  providers: [CentroService],
  exports: [CentroService],
})
export class CentroModule {}
