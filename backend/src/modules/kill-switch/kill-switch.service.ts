import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KillSwitchService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.killSwitch.findMany({ orderBy: { name: 'asc' } });
  }

  async toggle(name: string, enabled: boolean, reason?: string, toggledBy?: string) {
    return this.prisma.killSwitch.upsert({
      where: { name },
      create: { name, enabled, reason, toggledBy, toggledAt: new Date() },
      update: { enabled, reason, toggledBy, toggledAt: new Date() },
    });
  }

  async initializeDefaults() {
    const defaults = [
      'TRADING_ENGINE', 'SIGNAL_GENERATION', 'PARTNER_SIGNAL_GATE',
      'AI_BUILDER', 'AFFILIATE_SYSTEM', 'COMPETITION_ARENA',
      'PAYMENT_PROCESSING', 'CHAT_SYSTEM', 'ACADEMY',
    ];
    for (const name of defaults) {
      const existing = await this.prisma.killSwitch.findUnique({ where: { name } });
      if (!existing) {
        await this.prisma.killSwitch.create({ data: { name, enabled: true } });
      }
    }
    return this.getAll();
  }

  async isEnabled(name: string): Promise<boolean> {
    const sw = await this.prisma.killSwitch.findUnique({ where: { name } });
    return sw?.enabled ?? true;
  }
}
