import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GhostTrackerService {
  constructor(private prisma: PrismaService) {}

  async getAlerts(limit = 50) {
    return this.prisma.ghostTrackerAlert.findMany({ orderBy: { detectedAt: 'desc' }, take: limit });
  }

  async createAlert(type: string, source: string, details: string, severity: string, threatScore: number) {
    return this.prisma.ghostTrackerAlert.create({
      data: { type, source, details, severity, threatScore },
    });
  }

  async resolveAlert(id: string) {
    return this.prisma.ghostTrackerAlert.update({ where: { id }, data: { resolved: true } });
  }

  async getThreatMap() {
    const alerts = await this.prisma.ghostTrackerAlert.findMany({
      where: { resolved: false },
      orderBy: { threatScore: 'desc' },
    });
    return {
      domainWatchdog: alerts.filter(a => a.type === 'DOMAIN'),
      impersonation: alerts.filter(a => a.type === 'IMPERSONATION'),
      reverseEngineering: alerts.filter(a => a.type === 'REVERSE_ENGINEERING'),
      brokerManipulation: alerts.filter(a => a.type === 'BROKER_MANIPULATION'),
      signalLeaks: alerts.filter(a => a.type === 'SIGNAL_LEAK'),
      totalThreats: alerts.length,
      avgThreatScore: alerts.length > 0 ? alerts.reduce((s, a) => s + a.threatScore, 0) / alerts.length : 0,
    };
  }

  async reportSuspicious(userId: string, type: string, description: string) {
    return this.prisma.suspiciousReport.create({ data: { userId, type, description } });
  }

  async getSuspiciousReports() {
    return this.prisma.suspiciousReport.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLoginAlerts(userId: string) {
    return this.prisma.loginAlert.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 20 });
  }

  async recordLogin(userId: string, ipAddress: string, userAgent?: string, location?: string) {
    const recentLogins = await this.prisma.loginAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    const suspicious = recentLogins.length > 0 && recentLogins[0].ipAddress !== ipAddress;
    return this.prisma.loginAlert.create({
      data: { userId, ipAddress, userAgent, location, suspicious },
    });
  }
}
