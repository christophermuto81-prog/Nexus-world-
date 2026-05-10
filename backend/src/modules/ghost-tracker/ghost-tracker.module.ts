import { Module } from '@nestjs/common';
import { GhostTrackerService } from './ghost-tracker.service';
import { GhostTrackerController } from './ghost-tracker.controller';

@Module({
  providers: [GhostTrackerService],
  controllers: [GhostTrackerController],
  exports: [GhostTrackerService],
})
export class GhostTrackerModule {}
