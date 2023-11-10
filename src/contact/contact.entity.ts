import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'contact' })
export class Contact {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'O telefone precisa ser preenchido.' })
  @Length(10, 14, { message: 'O telefone precisa ter entre 10 e 14 carcteres.' })
  @Column({ length: 14 })
  public phone: string;
  
  @IsNotEmpty({ message: 'O celular precisa ser preenchido.' })
  @Length(11, 15, { message: 'O celular precisa ter entre 11 e 15 carcteres.' })
  @Column({ length: 15 })
  public cellphone: string;
  
  @IsNotEmpty({ message: 'O e-mail precisa ser preenchido.' })
  @IsEmail({}, { message: 'O e-mail é inválido.' })
  @Column({ length: 80 })
  public email: string;
}