import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AiBuilderService } from './ai-builder.service';

@ApiTags('ai-builder')
@Controller('api/ai-builder')
export class AiBuilderController {
  constructor(private service: AiBuilderService) {}

  @Get('tiers')
  getTiers() {
    return this.service.getTiers();
  }

  @Get('filters')
  getFilters() {
    return this.service.getLevel1Filters();
  }

  @Get('marketplace')
  getMarketplace() {
    return this.service.getMarketplace();
  }

  @Get('my-strategies')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getMyStrategies(@Request() req: any) {
    return this.service.getStrategies(req.user.id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Request() req: any, @Body() body: { name: string; filters: any; tier: string }) {
    return this.service.createStrategy(req.user.id, body.name, body.filters, body.tier);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Request() req: any, @Param('id') id: string, @Body() body: { filters?: any; backtestResult?: any; paperTradeResult?: any }) {
    return this.service.updateStrategy(id, req.user.id, body);
  }

  @Post('publish/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  publish(@Request() req: any, @Param('id') id: string) {
    return this.service.publishStrategy(id, req.user.id);
  }
}
