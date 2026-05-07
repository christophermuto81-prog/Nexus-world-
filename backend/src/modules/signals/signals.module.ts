import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { SignalEngine } from './signal-engine.service';

@Module({
  providers: [SignalsService, SignalEngine],
  controllers: [SignalsController],
  exports: [SignalsService, SignalEngine],
})
export class SignalsModule {}
