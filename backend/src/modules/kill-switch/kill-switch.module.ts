import { Module } from '@nestjs/common';
import { KillSwitchService } from './kill-switch.service';
import { KillSwitchController } from './kill-switch.controller';

@Module({
  providers: [KillSwitchService],
  controllers: [KillSwitchController],
  exports: [KillSwitchService],
})
export class KillSwitchModule {}
