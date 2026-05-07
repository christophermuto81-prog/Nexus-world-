import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('api/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('coinbase')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createCoinbaseCharge(
    @CurrentUser('id') userId: string,
    @Body() body: { amount: number; description: string; tierId?: string; passId?: string },
  ) {
    return this.paymentsService.createCoinbaseCharge(userId, body.amount, body.description, {
      tierId: body.tierId || '',
      passId: body.passId || '',
    });
  }

  @Post('flutterwave')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createFlutterwavePayment(
    @CurrentUser() user: { id: string; email: string },
    @Body() body: { amount: number; tierId?: string; passId?: string },
  ) {
    return this.paymentsService.createFlutterwavePayment(user.id, body.amount, user.email, {
      tierId: body.tierId || '',
      passId: body.passId || '',
    });
  }

  @Post('webhook/coinbase')
  coinbaseWebhook(@Body() payload: Record<string, any>) {
    return this.paymentsService.handleWebhook('coinbase', payload);
  }

  @Post('webhook/flutterwave')
  flutterwaveWebhook(@Body() payload: Record<string, any>) {
    return this.paymentsService.handleWebhook('flutterwave', payload);
  }
}
