import { Injectable } from "@nestjs/common";
import { QueryRunner, TypeORMError } from "typeorm";
import { EnterprisePerson } from "./enterprise-person.entity";
import { ResponseModel } from "src/utils/response-model";
import { validate } from "class-validator";

@Injectable()
export class EnterprisePersonService {
  async findOne(where: { id?: number }, runner: QueryRunner): Promise<EnterprisePerson | undefined> {
    let entity: EnterprisePerson | undefined = undefined;
    try {
      entity = await runner.manager.findOne(EnterprisePerson, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    }

    return entity;
  }

  async save(person: EnterprisePerson, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const errors = await validate(person);
      if (errors.length > 0) {
        return {
          success: false,
          model: 'enterprise-person',
          errors,
        };
      } else {
        const entity = await runner.manager.save(EnterprisePerson, person);
        if (!entity) {
          return {
            success: false,
            model: 'enterprise-person',
            errors: 'Erro ao salvar a pessoa jurídica',
          };
        } else {
          return {
            success: true,
            model: 'enterprise-person',
            errors: [],
          };
        }
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return {
        success: false,
        model: 'enterprise-person',
        errors: (e as TypeORMError).message,
      };
    }
  }

  async delete(person: EnterprisePerson, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const entity = await runner.manager.remove(EnterprisePerson, person);
      if (!entity) {
        return {
          success: false,
          model: 'enterprise-person',
          errors: 'Erro ao remover a pessoa jurídica',
        };
      } else {
        return {
          success: true,
          model: 'enterprise-person',
          errors: [],
        };
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return {
        success: false,
        model: 'enterprise-person',
        errors: (e as TypeORMError).message,
      };
    }
  }
}