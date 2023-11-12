import { QueryRunner, TypeORMError } from "typeorm";
import { IndividualPerson } from "./individual-person.entity";
import { ResponseModel } from "src/utils/response-model";
import { validate } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IndividualPersonService {
  async findOne(where: { id?: number }, runner: QueryRunner): Promise<IndividualPerson | undefined> {
    let entity: IndividualPerson | undefined = undefined;
    try {
      entity = await runner.manager.findOne(IndividualPerson, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    }
    return entity;
  }

  async save(individualPerson: IndividualPerson, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const errors = await validate(individualPerson);
      if (errors.length > 0) {
        return {
          success: false,
          model: 'individual_person',
          errors,
          entity: undefined,
        };
      } else {
        const entity = await runner.manager.save(IndividualPerson, individualPerson);
        if (!entity)
          return { success: false, model: 'individual_person', errors: 'Erro ao salvar a pessoa física.', entity };
        else
          return { success: true, model: 'individual_person', errors: [], entity };
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'individual_person', errors: (e as TypeORMError).message, entity: undefined };
    }
  }

  async delete(individualPerson: IndividualPerson, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const entity = await runner.manager.remove(IndividualPerson, individualPerson);
      if (!entity)
        return { success: false, model: 'individual_person', errors: 'Erro ao remover a pessoa física.', entity };
      else
        return { success: true, model: 'individual_person', errors: [], entity };
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'individual_person', errors: (e as TypeORMError).message, entity: undefined };
    }
  }
}