import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getMessages(limit = 50) {
    return this.prisma.chatMessage.findMany({
      where: { flagged: false },
      include: { user: { select: { name: true, id: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async sendMessage(userId: string, content: string) {
    return this.prisma.chatMessage.create({
      data: { userId, content },
      include: { user: { select: { name: true, id: true } } },
    });
  }

  async flagMessage(id: string) {
    return this.prisma.chatMessage.update({ where: { id }, data: { flagged: true } });
  }

  async getOnlineCount() {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const count = await this.prisma.user.count({ where: { lastLoginAt: { gte: fiveMinAgo } } });
    return { online: Math.max(count, 1) };
  }
}
