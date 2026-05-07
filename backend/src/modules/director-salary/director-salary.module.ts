import { Module } from '@nestjs/common';
import { DirectorSalaryController } from './director-salary.controller';
import { DirectorSalaryService } from './director-salary.service';

@Module({
  controllers: [DirectorSalaryController],
  providers: [DirectorSalaryService],
  exports: [DirectorSalaryService],
})
export class DirectorSalaryModule {}
