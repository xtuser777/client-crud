import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'enterprise_person'})
export class EnterprisePerson {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'A razão social precisa ser preenchida.' })
  @Length(5, 80, { message: 'A razão social precisa ter entre 5 e 80 caracteres.' })
  @Column({ length: 80 })
  public corporateName: string;
  
  @IsNotEmpty({ message: 'O nome fantasia precisa ser preenchido.' })
  @Length(2, 80, { message: 'O nome fantasia precisa ter entre 5 e 80 caracteres.' })
  @Column({ length: 80 })
  public fantasyName: string;
  
  @IsNotEmpty({ message: 'O CNPJ precisa ser preenchido.' })
  @Length(15, 19, { message: 'O CNPJ precisa ter entre 15 e 19 caracteres.' })
  @Column({ length: 19 })
  public document: string;
}