import { Module } from '@nestjs/common';
import { FailureTheoryService } from './failure-theory.service';
import { FailureTheoryController } from './failure-theory.controller';

@Module({
  providers: [FailureTheoryService],
  controllers: [FailureTheoryController],
  exports: [FailureTheoryService],
})
export class FailureTheoryModule {}
