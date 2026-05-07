import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { SignalsModule } from './modules/signals/signals.module';
import { TradesModule } from './modules/trades/trades.module';
import { AdminModule } from './modules/admin/admin.module';
import { CommunityModule } from './modules/community/community.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';
import { BrokersModule } from './modules/brokers/brokers.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { InstrumentsModule } from './modules/instruments/instruments.module';
import { CompetitionsModule } from './modules/competitions/competitions.module';
import { PartnershipsModule } from './modules/partnerships/partnerships.module';
import { DirectorSalaryModule } from './modules/director-salary/director-salary.module';
import { AffiliateSettlementModule } from './modules/affiliate-settlement/affiliate-settlement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    SignalsModule,
    TradesModule,
    AdminModule,
    CommunityModule,
    AffiliatesModule,
    BrokersModule,
    PaymentsModule,
    WebsocketModule,
    InstrumentsModule,
    CompetitionsModule,
    PartnershipsModule,
    DirectorSalaryModule,
    AffiliateSettlementModule,
  ],
})
export class AppModule {}
