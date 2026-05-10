import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrokersService {
  constructor(private prisma: PrismaService) {}

  async getBrokers(search?: string) {
    return this.prisma.broker.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { rating: 'desc' },
    });
  }

  async getBrokerById(id: string) {
    const broker = await this.prisma.broker.findUnique({ where: { id } });
    if (!broker) throw new NotFoundException('Broker not found');
    return broker;
  }

  async connectBroker(userId: string, brokerId: string, apiKey: string, apiSecret: string) {
    await this.getBrokerById(brokerId);

    return this.prisma.brokerConnection.create({
      data: {
        userId,
        brokerId,
        apiKey,
        apiSecret,
        status: 'CONNECTED', // simplified for MVP
      },
      include: { broker: true },
    });
  }

  async getUserConnections(userId: string) {
    return this.prisma.brokerConnection.findMany({
      where: { userId },
      include: { broker: true },
    });
  }
}
