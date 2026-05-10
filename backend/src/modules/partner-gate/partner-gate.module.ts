import { Module } from '@nestjs/common';
import { PartnerGateService } from './partner-gate.service';
import { PartnerGateController } from './partner-gate.controller';

@Module({
  providers: [PartnerGateService],
  controllers: [PartnerGateController],
  exports: [PartnerGateService],
})
export class PartnerGateModule {}
