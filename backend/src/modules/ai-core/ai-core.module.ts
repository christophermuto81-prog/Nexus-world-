import { Module } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { AiCoreController } from './ai-core.controller';

@Module({
  providers: [AiCoreService],
  controllers: [AiCoreController],
  exports: [AiCoreService],
})
export class AiCoreModule {}
