import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        solanaAddress: true,
        lxTokenAccount: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        kycStatus: true,
        solanaAddress: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSolanaWallet(userId: string) {
    try {
      // Dynamic import for Solana dependencies
      const { Keypair, Connection, LAMPORTS_PER_SOL } = await import('@solana/web3.js');

      const rpcUrl = this.config.get('SOLANA_RPC_URL', 'https://api.devnet.solana.com');
      const connection = new Connection(rpcUrl, 'confirmed');
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();

      // Airdrop 0.002 SOL on devnet
      try {
        const sig = await connection.requestAirdrop(
          keypair.publicKey,
          0.002 * LAMPORTS_PER_SOL,
        );
        await connection.confirmTransaction(sig);
        this.logger.log(`Airdropped 0.002 SOL to ${publicKey}`);
      } catch (err) {
        this.logger.warn(`Airdrop failed (devnet rate limit): ${err}`);
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          solanaAddress: publicKey,
          solanaPrivKey: Buffer.from(keypair.secretKey).toString('base64'),
        },
      });

      this.logger.log(`Created Solana wallet for user ${userId}: ${publicKey}`);
      return publicKey;
    } catch (err) {
      this.logger.error(`Failed to create Solana wallet: ${err}`);
      throw err;
    }
  }

  async getStats() {
    const total = await this.prisma.user.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await this.prisma.user.count({
      where: { createdAt: { gte: today } },
    });
    return { total, todayCount };
  }
}
