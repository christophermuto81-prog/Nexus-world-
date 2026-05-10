import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApexReService {
  constructor(private prisma: PrismaService) {}

  async getVectors() {
    return this.prisma.apexReVector.findMany({ orderBy: { vectorIndex: 'asc' } });
  }

  async initializeVectors() {
    const vectors = [
      { vectorName: 'Broker Behavioral RE', vectorIndex: 1 },
      { vectorName: 'Competitor Algorithm RE', vectorIndex: 2 },
      { vectorName: 'Market Microstructure RE', vectorIndex: 3 },
      { vectorName: 'Platform Self-RE', vectorIndex: 4 },
      { vectorName: 'Side-Channel & Emissions Analysis', vectorIndex: 5 },
      { vectorName: 'Behavioral & Neuro-Economic RE', vectorIndex: 6 },
      { vectorName: 'Recursive Self-Expansion', vectorIndex: 7 },
    ];

    for (const v of vectors) {
      const existing = await this.prisma.apexReVector.findFirst({ where: { vectorIndex: v.vectorIndex } });
      if (!existing) {
        await this.prisma.apexReVector.create({ data: v });
      }
    }
    return this.getVectors();
  }

  async updateVector(id: string, confidence: number, findings?: any) {
    return this.prisma.apexReVector.update({
      where: { id },
      data: { confidence, findings, lastScan: new Date() },
    });
  }

  async getMetaConfidence() {
    const vectors = await this.getVectors();
    if (vectors.length === 0) return { metaConfidence: 0, vectorCount: 0 };
    const avg = vectors.reduce((sum, v) => sum + v.confidence, 0) / vectors.length;
    return { metaConfidence: Math.round(avg * 100) / 100, vectorCount: vectors.length };
  }
}
