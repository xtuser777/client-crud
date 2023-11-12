import { Injectable } from "@nestjs/common";
import { QueryRunner, TypeORMError } from "typeorm";
import { Person } from "./person.entity";
import { ResponseModel } from "src/utils/response-model";
import { validate } from "class-validator";

@Injectable()
export class PersonService {
  async findOne(where: { id?: number }, runner: QueryRunner): Promise<Person | undefined> {
    let entity: Person | undefined = undefined;
    try {
      entity = await runner.manager.findOne(Person, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    }

    return entity;
  }

  async save(person: Person, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const errors = await validate(person);
      if (errors.length > 0) {
        return {
          success: false,
          model: 'person',
          errors,
          entity: undefined,
        };
      } else {
        const entity = await runner.manager.save(Person, person);
        if (!entity)
          return { success: false, model: 'person', errors: 'Erro ao salvar a pessoa.', entity };
        else
          return { success: true, model: 'person', errors: [], entity };
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'person', errors: (e as TypeORMError).message, entity: undefined };
    }
  }

  async delete(person: Person, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const entity = await runner.manager.remove(Person, person);
      if (!entity)
        return { success: false, model: 'person', errors: 'Erro ao remover a pessoa.', entity };
      else
        return { success: true, model: 'person', errors: [], entity };
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'person', errors: (e as TypeORMError).message, entity: undefined };
    }
  }
}