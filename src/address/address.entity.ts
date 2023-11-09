import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'A rua/avenida/rodovia precisa ser preenchida.' })
  @Length(5, 80)
  @Column({ length: 80, nullable: false })
  public street: string;
  
  @IsNotEmpty({ message: 'O número precisa ser preenchido.' })
  @Length(1, 5)
  @Column({ length: 5, nullable: false })
  public number: string;

  @IsNotEmpty({ message: 'O bairro precisa ser preenchido.' })
  @Length(5, 40)
  @Column({ length: 40, nullable: false })
  public neighborhood: string;
  
  @Column({ length: 20, nullable: true })
  public complement: string;
  
  @IsNotEmpty({ message: 'O CEP precisa ser preenchido.' })
  @Length(10, 10)
  @Column({ length: 10, nullable: false })
  public code: string;
  
  @IsNotEmpty({ message: 'A cidade precisa ser preenchida.' })
  @Length(2, 70)
  @Column({ length: 70, nullable: false })
  public city: string;
  
  @IsNotEmpty({ message: 'O estado precisa ser preenchido.' })
  @Length(2, 2)
  @Column({ length: 2, nullable: false })
  public state: string;
}