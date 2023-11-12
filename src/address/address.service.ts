import { Injectable } from "@nestjs/common";
import { DataSource, QueryRunner, TypeORMError } from "typeorm";
import { Address } from "./address.entity";
import { ResponseModel } from "src/utils/response-model";
import { validate } from "class-validator";

@Injectable()
export class AddressService {  
  async findOne(where: { id?: number; }, runner: QueryRunner): Promise<Address | undefined> {
    let address: Address | undefined = undefined;

    try {
      address = await runner.manager.findOne(Address, { where });
    } catch (e) {
      console.error((e as TypeORMError).message);
    }

    return address;
  }

  async save(address: Address, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const errors = await validate(address);
      if (errors.length > 0) {
        return {
          success: false,
          model: 'address',
          errors,
          entity: undefined,
        }
      } else {
        const entity = await runner.manager.save(Address, address);
        if (!entity) return {
          success: false,
          model: 'address',
          errors: 'Erro ao salvar o endereço.',
          entity,
        };

        return {
          success: true,
          model: 'address',
          errors: [],
          entity,
        };
      }
    } catch (e) {
      console.error((e as TypeORMError).message);
      return {
        success: false,
        model: 'address',
        errors: (e as TypeORMError).message,
        entity: undefined,
      };
    }
  }

  async delete(address: Address, runner: QueryRunner): Promise<ResponseModel> {
    try {
      const entity = await runner.manager.remove(Address, address);
      if (!entity) return {
        success: false,
        model: 'address',
        errors: 'Erro ao remover o endereço.',
        entity,
      };

      return {
        success: true,
        model: 'address',
        errors: [],
        entity,
      };
    } catch (e) {
      console.error((e as TypeORMError).message);
      return {
        success: false,
        model: 'address',
        errors: (e as TypeORMError).message,
        entity: undefined,
      };
    }
  }
}