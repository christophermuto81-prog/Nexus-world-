import { Module } from '@nestjs/common';
import { AffiliateSettlementController } from './affiliate-settlement.controller';
import { AffiliateSettlementService } from './affiliate-settlement.service';

@Module({
  controllers: [AffiliateSettlementController],
  providers: [AffiliateSettlementService],
  exports: [AffiliateSettlementService],
})
export class AffiliateSettlementModule {}
