import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionMode, CompetitionFrequency } from '@prisma/client';

@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService) {}

  async getCompetitions(mode?: string, frequency?: string) {
    return this.prisma.competition.findMany({
      where: {
        ...(mode ? { mode: mode as CompetitionMode } : {}),
        ...(frequency ? { frequency: frequency as CompetitionFrequency } : {}),
      },
      include: { entries: { select: { id: true, userId: true, pnl: true, rank: true } } },
      orderBy: { startsAt: 'desc' },
    });
  }

  async getCompetition(id: string) {
    const comp = await this.prisma.competition.findUnique({
      where: { id },
      include: {
        entries: {
          include: { user: { select: { id: true, name: true, email: true } } },
          orderBy: { pnl: 'desc' },
        },
      },
    });
    if (!comp) throw new NotFoundException('Competition not found');
    return comp;
  }

  async joinCompetition(userId: string, competitionId: string) {
    const comp = await this.prisma.competition.findUnique({
      where: { id: competitionId },
    });
    if (!comp) throw new NotFoundException('Competition not found');
    if (comp.status !== 'OPEN') throw new BadRequestException('Competition is not open for entries');

    const existing = await this.prisma.competitionEntry.findUnique({
      where: { competitionId_userId: { competitionId, userId } },
    });
    if (existing) throw new BadRequestException('Already joined this competition');

    return this.prisma.competitionEntry.create({
      data: { competitionId, userId },
    });
  }

  async getLeaderboard(competitionId: string) {
    return this.prisma.competitionEntry.findMany({
      where: { competitionId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { pnl: 'desc' },
    });
  }

  async createCompetition(data: {
    name: string;
    frequency: CompetitionFrequency;
    mode: CompetitionMode;
    entryFee: number;
    prizePool: number;
    manualOnly: boolean;
    startsAt: Date;
    endsAt: Date;
  }) {
    return this.prisma.competition.create({ data });
  }

  async settleCompetition(competitionId: string) {
    const comp = await this.prisma.competition.findUnique({
      where: { id: competitionId },
      include: { entries: { orderBy: { pnl: 'desc' } } },
    });
    if (!comp) throw new NotFoundException('Competition not found');

    const winnerPrize = comp.prizePool * (comp.prizeSplit / 100);
    const entries = comp.entries;

    if (entries.length > 0) {
      await this.prisma.competitionEntry.update({
        where: { id: entries[0].id },
        data: { rank: 1, settled: true, prizeAmount: winnerPrize },
      });

      for (let i = 1; i < entries.length; i++) {
        await this.prisma.competitionEntry.update({
          where: { id: entries[i].id },
          data: { rank: i + 1, settled: true },
        });
      }
    }

    return this.prisma.competition.update({
      where: { id: competitionId },
      data: { status: 'SETTLED' },
    });
  }
}
