import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { CentroService } from './centro.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('centro')
export class CentroController {
  constructor(private centroService: CentroService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.centroService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Request() req: any,
    @Body() body: Partial<{ nome: string; tipo: string; slogan: string; descricao: string }>,
  ) {
    return this.centroService.updateProfile(req.user.id, body);
  }
}
