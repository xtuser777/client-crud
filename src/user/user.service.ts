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
              createUserDto.person.address = responseAddress.entity;
              createUserDto.person.contact = responseContact.entity;
              createUserDto.person.individual = responseIndividualPerson.entity;
              const responsePerson = await this.personService.save(createUserDto.person, runner);
              if (!responsePerson.success) {
                await runner.rollbackTransaction();
                response = responsePerson;
              } else {
                createUserDto.person = responsePerson.entity;
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

  async findAll(): Promise<User[]> {
    let users: User[] = [];
    const runner = this.dataSource.createQueryRunner();
    try {
      await runner.connect();
      users = await runner.manager.find(User);
    } catch (e) {
      console.error((e as TypeORMError).message);
    } finally {
      await runner.release();
    }

    return users;
  }

  async findOne(where: { id?: number; login?: string; }): Promise<User | undefined> {
    let user: User | undefined = undefined;

    const runner = this.dataSource.createQueryRunner();
    try {
      await runner.connect();
      user = await runner.manager.findOne(User, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    } finally {
      await runner.release();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const errors = await validate(updateUserDto);
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
        const responseAddress = await this.addressService.save(updateUserDto.person.address, runner);
        if (!responseAddress.success) {
          await runner.rollbackTransaction();
          response = responseAddress;
        } else {
          const responseContact = await this.contactService.save(updateUserDto.person.contact, runner);
          if (!responseContact.success) {
            await runner.rollbackTransaction();
            response = responseContact;
          } else {
            const responseIndividualPerson = await this.individualPersonService.save(updateUserDto.person.individual, runner);
            if (!responseIndividualPerson.success) {
              await runner.rollbackTransaction();
              response = responseIndividualPerson;
            } else {
              const responsePerson = await this.personService.save(updateUserDto.person, runner);
              if (!responsePerson.success) {
                await runner.rollbackTransaction();
                response = responsePerson;
              } else {
                const user = { id, ...updateUserDto };
                const entity = await runner.manager.save(User, user);
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

  async remove(id: number) {
    let response: ResponseModel;
    const runner = this.dataSource.createQueryRunner();
    try {
      await runner.connect();
      const user = await this.findOne({ id });
      if (!user) {
        response = {
          success: false,
          model: 'user',
          errors: 'Usuário não encontrado.',
          entity: undefined,
        };
      } else {
        await runner.startTransaction();
        const entity = await runner.manager.remove(User, user);
        if (!entity) {
          await runner.rollbackTransaction();
          response = {
            success: false,
            model: 'user',
            errors: 'Erro ao remover o usuário.',
            entity: undefined,
          };
        } else {
          const responsePerson = await this.personService.delete(user.person, runner);
          if (!responsePerson.success) {
            await runner.rollbackTransaction();
            response = responsePerson;
          } else {
            const responseIndividualPerson = await this.individualPersonService.delete(user.person.individual, runner);
            if (!responseIndividualPerson.success) {
              await runner.rollbackTransaction();
              response = responseIndividualPerson;
            } else {
              const responseContact = await this.contactService.delete(user.person.contact, runner);
              if (!responseContact.success) {
                await runner.rollbackTransaction();
                response = responseContact;
              } else {
                const responseAddress = await this.addressService.delete(user.person.address, runner);
                if (!responseAddress.success) {
                  await runner.rollbackTransaction();
                  response = responseAddress;
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
