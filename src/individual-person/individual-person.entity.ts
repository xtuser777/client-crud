import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'individual_person' })
export class IndividualPerson {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'O nome precisa ser preenchido.' })
  @Length(2, 70, { message: 'O nome precisa ter entre 2 e 70 caracteres.' })
  @Column({ length: 70 })
  public name: string;
  
  @IsNotEmpty({ message: 'O CPF precisa ser preenchido.' })
  @Length(11, 14, { message: 'O CPF precisa ter entre 11 e 14 caracteres.' })
  @Column({ length: 14 })
  public document: string;
  
  @IsNotEmpty({ message: 'A data de nascimento precisa ser preenchido.' })
  @Length(10, 10, { message: 'A data de nascimento precisa ter 10 caracteres.' })
  @Column({ length: 10 })
  public birth: string;
}