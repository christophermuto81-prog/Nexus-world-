import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ApexReService } from './apex-re.service';

@ApiTags('apex-re')
@Controller('api/apex-re')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class ApexReController {
  constructor(private service: ApexReService) {}

  @Get('vectors')
  getVectors() {
    return this.service.getVectors();
  }

  @Get('meta-confidence')
  getMetaConfidence() {
    return this.service.getMetaConfidence();
  }

  @Post('initialize')
  initialize() {
    return this.service.initializeVectors();
  }

  @Put('vector/:id')
  updateVector(@Param('id') id: string, @Body() body: { confidence: number; findings?: any }) {
    return this.service.updateVector(id, body.confidence, body.findings);
  }
}
