import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterprisePerson } from './enterprise-person.entity';
import { EnterprisePersonService } from './enterprise-person.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnterprisePerson])],
  providers: [EnterprisePersonService],
  exports: [EnterprisePersonService],
})
export class EnterprisePersonModule {}
