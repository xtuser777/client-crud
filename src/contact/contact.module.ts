import { Module } from '@nestjs/common';
import { Contact } from './contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactService],
})
export class ContactModule {}
