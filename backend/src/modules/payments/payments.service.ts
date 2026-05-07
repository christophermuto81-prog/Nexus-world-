import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async createCoinbaseCharge(userId: string, amount: number, description: string, metadata: Record<string, string>) {
    // Coinbase Commerce integration placeholder
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'USD',
        provider: 'coinbase',
        status: 'PENDING',
        metadata: { description, ...metadata },
      },
    });

    // In production, call Coinbase Commerce API to create a charge
    // For MVP, return mock charge URL
    return {
      paymentId: payment.id,
      chargeUrl: `https://commerce.coinbase.com/charges/mock-${payment.id}`,
      status: 'PENDING',
    };
  }

  async createFlutterwavePayment(userId: string, amount: number, email: string, metadata: Record<string, string>) {
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'USD',
        provider: 'flutterwave',
        status: 'PENDING',
        metadata,
      },
    });

    // In production, call Flutterwave API
    return {
      paymentId: payment.id,
      paymentLink: `https://checkout.flutterwave.com/mock-${payment.id}`,
      status: 'PENDING',
    };
  }

  async handleWebhook(provider: string, payload: Record<string, any>) {
    this.logger.log(`Webhook received from ${provider}`);

    // Find payment by external ID
    const externalId = payload.id || payload.charge_id;
    if (!externalId) return { received: true };

    const payment = await this.prisma.payment.findFirst({
      where: { externalId },
    });

    if (!payment) {
      this.logger.warn(`Payment not found for external ID: ${externalId}`);
      return { received: true };
    }

    if (payload.status === 'completed' || payload.event === 'charge:confirmed') {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'COMPLETED' },
      });

      // Auto-activate subscription
      const metadata = payment.metadata as Record<string, string>;
      if (metadata?.tierId) {
        await this.subscriptionsService.subscribe(payment.userId, metadata.tierId, payment.id);
      }
      if (metadata?.passId) {
        await this.subscriptionsService.purchaseSignalPass(payment.userId, metadata.passId, payment.id);
      }
    }

    return { received: true };
  }
}
