import { QueryRunner, TypeORMError } from "typeorm";
import { Contact } from "./contact.entity";
import { ResponseModel } from "src/utils/response-model";
import { validate } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactService {
  async findOne(where: { id?: number }, runner: QueryRunner): Promise<Contact | undefined> {
    let contact: Contact | undefined = undefined;
    try {
      contact = await runner.manager.findOne(Contact, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    }
    return contact;
  }

  async save(contact: Contact, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const errors = await validate(contact);
      if (errors.length > 0) {
        return { success: false, model: 'contact', errors, entity: undefined };
      } else {
        const entity = await runner.manager.save(Contact, contact);
        if (!entity)
          return { success: false, model: 'contact', errors: 'Erro ao salvar o contato.', entity };
        else
          return { success: true, model: 'contact', errors: [], entity };
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'contact', errors: (e as TypeORMError).message, entity: undefined };
    }
  }

  async delete(contact: Contact, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const entity = await runner.manager.remove(Contact, contact);
      if (!entity)
        return { success: false, model: 'contact', errors: 'Erro ao remover o contato.', entity };
      else
        return { success: true, model: 'contact', errors: [], entity };
    } catch (e) {
      console.error((e as TypeORMError).message);
      return { success: false, model: 'contact', errors: (e as TypeORMError).message, entity: undefined };
    }
  }
}