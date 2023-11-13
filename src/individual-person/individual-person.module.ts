import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualPerson } from './individual-person.entity';
import { IndividualPersonService } from './individual-person.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndividualPerson])],
  providers: [IndividualPersonService],
  exports: [IndividualPersonService],
})
export class IndividualPersonModule {}
