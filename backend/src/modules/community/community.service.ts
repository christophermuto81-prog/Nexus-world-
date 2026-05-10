import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async getRecentEvents(limit = 50) {
    return this.prisma.communityEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async createEvent(type: string, message: string, location?: string, isGhost = false) {
    return this.prisma.communityEvent.create({
      data: { type, message, location, isGhost },
    });
  }

  async seedGhostEvents(count: number) {
    const cities = [
      { name: 'New York', loc: '40.7128,-74.0060' },
      { name: 'London', loc: '51.5074,-0.1278' },
      { name: 'Tokyo', loc: '35.6762,139.6503' },
      { name: 'Dubai', loc: '25.2048,55.2708' },
      { name: 'Singapore', loc: '1.3521,103.8198' },
      { name: 'Lagos', loc: '6.5244,3.3792' },
      { name: 'Johannesburg', loc: '-26.2041,28.0473' },
      { name: 'Sydney', loc: '-33.8688,151.2093' },
      { name: 'Mumbai', loc: '19.0760,72.8777' },
      { name: 'São Paulo', loc: '-23.5505,-46.6333' },
    ];

    const messages = [
      'just joined LatruxTrade!',
      'started their first paper trade',
      'unlocked AI Trader tier',
      'hit 85% win rate this week',
      'earned $500 in affiliate commissions',
    ];

    const events: { type: string; message: string; location: string; isGhost: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      events.push({
        type: 'JOIN',
        message: `Trader from ${city.name} ${msg}`,
        location: city.loc,
        isGhost: true,
      });
    }

    await this.prisma.communityEvent.createMany({ data: events });
    return { created: count };
  }
}
