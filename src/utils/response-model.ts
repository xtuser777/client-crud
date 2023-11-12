import { ValidationError } from "class-validator";

export interface ResponseModel {
  success: boolean;
  model: string;
  errors: string | ValidationError[];
  entity: any,
}