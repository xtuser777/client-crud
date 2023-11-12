import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressService } from 'src/address/address.service';
import { ContactService } from 'src/contact/contact.service';
import { IndividualPersonService } from 'src/individual-person/individual-person.service';
import { PersonService } from 'src/person/person.service';

@Module({
  imports: [AddressService, ContactService, IndividualPersonService, PersonService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
