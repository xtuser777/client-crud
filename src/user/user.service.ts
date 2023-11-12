import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, TypeORMError } from 'typeorm';
import { validate } from 'class-validator';
import { ResponseModel } from 'src/utils/response-model';
import { AddressService } from 'src/address/address.service';
import { ContactService } from 'src/contact/contact.service';
import { IndividualPersonService } from 'src/individual-person/individual-person.service';
import { PersonService } from 'src/person/person.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private addressService: AddressService,
    private contactService: ContactService,
    private individualPersonService: IndividualPersonService,
    private personService: PersonService) { }

  async create(createUserDto: CreateUserDto): Promise<ResponseModel> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      return {
        success: false,
        model: 'user',
        errors,
        entity: undefined,
      };
    } else {
      let response: ResponseModel;
      const runner = this.dataSource.createQueryRunner();
      try {
        await runner.connect();
        await runner.startTransaction();
        const responseAddress = await this.addressService.save(createUserDto.person.address, runner);
        if (!responseAddress.success) { 
          await runner.rollbackTransaction();
          response = responseAddress; 
        } else {
          const responseContact = await this.contactService.save(createUserDto.person.contact, runner);
          if (!responseContact.success) {
            await runner.rollbackTransaction();
            response = responseContact;
          } else {
            const responseIndividualPerson = await this.individualPersonService.save(createUserDto.person.individual, runner);
            if (!responseIndividualPerson.success) {
              await runner.rollbackTransaction();
              response = responseIndividualPerson;
            } else {
              const responsePerson = await this.personService.save(createUserDto.person, runner);
              if (!responsePerson.success) {
                await runner.rollbackTransaction();
                response = responsePerson;
              } else {
                const entity = await runner.manager.save(User, createUserDto);
                if (!entity) {
                  await runner.rollbackTransaction();
                  response = {
                    success: false,
                    model: 'user',
                    errors: 'Erro ao salvar o usuário.',
                    entity: undefined,
                  };
                } else {
                  await runner.commitTransaction();
                  response = {
                    success: true,
                    model: 'user',
                    errors: [],
                    entity,
                  };
                }
              }
            }
          }
        }
      } catch (e) {
        console.error((e as TypeORMError).message);
        await runner.rollbackTransaction();
        return {
          success: false,
          model: 'user',
          errors: (e as TypeORMError).message,
          entity: undefined,
        };
      } finally {
        await runner.release();
      }

      return response;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
