import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async getDonationFunds(limit = 30) {
    return this.prisma.donationFund.findMany({ orderBy: { date: 'desc' }, take: limit });
  }

  async allocateDaily(platformEarnings: number) {
    const date = new Date().toISOString().split('T')[0];
    const donationAmount = platformEarnings * 0.0025;
    return this.prisma.donationFund.upsert({
      where: { date },
      create: { date, platformEarnings, donationAmount },
      update: { platformEarnings, donationAmount },
    });
  }

  async setRecipient(date: string, recipientCause: string) {
    return this.prisma.donationFund.update({ where: { date }, data: { recipientCause } });
  }

  async getTotalDonated() {
    const agg = await this.prisma.donationFund.aggregate({ _sum: { donationAmount: true } });
    return { total: agg._sum.donationAmount || 0 };
  }
}
