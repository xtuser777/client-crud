import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressModule } from 'src/address/address.module';
import { ContactModule } from 'src/contact/contact.module';
import { IndividualPersonModule } from 'src/individual-person/individual-person.module';
import { PersonModule } from 'src/person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AddressModule, ContactModule, IndividualPersonModule, PersonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
