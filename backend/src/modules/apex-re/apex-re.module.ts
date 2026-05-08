import { Module } from '@nestjs/common';
import { ApexReService } from './apex-re.service';
import { ApexReController } from './apex-re.controller';

@Module({
  providers: [ApexReService],
  controllers: [ApexReController],
  exports: [ApexReService],
})
export class ApexReModule {}
