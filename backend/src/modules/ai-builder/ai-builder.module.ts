import { Module } from '@nestjs/common';
import { AiBuilderService } from './ai-builder.service';
import { AiBuilderController } from './ai-builder.controller';

@Module({
  providers: [AiBuilderService],
  controllers: [AiBuilderController],
  exports: [AiBuilderService],
})
export class AiBuilderModule {}
