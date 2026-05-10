import { Module } from '@nestjs/common';
import { BrokerIntegrityService } from './broker-integrity.service';
import { BrokerIntegrityController } from './broker-integrity.controller';

@Module({
  providers: [BrokerIntegrityService],
  controllers: [BrokerIntegrityController],
  exports: [BrokerIntegrityService],
})
export class BrokerIntegrityModule {}
