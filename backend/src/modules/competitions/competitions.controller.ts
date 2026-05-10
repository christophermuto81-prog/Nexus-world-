import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { CompetitionsService } from './competitions.service';

@ApiTags('competitions')
@Controller('api/competitions')
export class CompetitionsController {
  constructor(private competitionsService: CompetitionsService) {}

  @Get()
  getCompetitions(
    @Query('mode') mode?: string,
    @Query('frequency') frequency?: string,
  ) {
    return this.competitionsService.getCompetitions(mode, frequency);
  }

  @Get(':id')
  getCompetition(@Param('id') id: string) {
    return this.competitionsService.getCompetition(id);
  }

  @Get(':id/leaderboard')
  getLeaderboard(@Param('id') id: string) {
    return this.competitionsService.getLeaderboard(id);
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  joinCompetition(
    @CurrentUser() user: { id: string },
    @Body() body: { competitionId: string },
  ) {
    return this.competitionsService.joinCompetition(user.id, body.competitionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  createCompetition(@Body() body: {
    name: string;
    frequency: string;
    mode: string;
    entryFee: number;
    prizePool: number;
    manualOnly: boolean;
    startsAt: string;
    endsAt: string;
  }) {
    return this.competitionsService.createCompetition({
      name: body.name,
      frequency: body.frequency as any,
      mode: body.mode as any,
      entryFee: body.entryFee,
      prizePool: body.prizePool,
      manualOnly: body.manualOnly,
      startsAt: new Date(body.startsAt),
      endsAt: new Date(body.endsAt),
    });
  }

  @Post(':id/settle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  settleCompetition(@Param('id') id: string) {
    return this.competitionsService.settleCompetition(id);
  }
}
