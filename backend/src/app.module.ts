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
import { AcademyModule } from './modules/academy/academy.module';
import { AiCoreModule } from './modules/ai-core/ai-core.module';
import { BrokerIntegrityModule } from './modules/broker-integrity/broker-integrity.module';
import { FailureTheoryModule } from './modules/failure-theory/failure-theory.module';
import { ApexReModule } from './modules/apex-re/apex-re.module';
import { TreasuryModule } from './modules/treasury/treasury.module';
import { DonationsModule } from './modules/donations/donations.module';
import { ChatModule } from './modules/chat/chat.module';
import { AiBuilderModule } from './modules/ai-builder/ai-builder.module';
import { GhostTrackerModule } from './modules/ghost-tracker/ghost-tracker.module';
import { KillSwitchModule } from './modules/kill-switch/kill-switch.module';
import { PartnerGateModule } from './modules/partner-gate/partner-gate.module';

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
    AcademyModule,
    AiCoreModule,
    BrokerIntegrityModule,
    FailureTheoryModule,
    ApexReModule,
    TreasuryModule,
    DonationsModule,
    ChatModule,
    AiBuilderModule,
    GhostTrackerModule,
    KillSwitchModule,
    PartnerGateModule,
  ],
})
export class AppModule {}
