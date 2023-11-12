import { IsNotEmpty, Length } from "class-validator";
import { Person } from "src/person/person.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'O nome de usuário precisa ser preenchido.' })
  @Length(2, 20, { message: 'O nome de usuário deve conter entre 2 e 20 caracteres.' })
  @Column()
  public login: string;

  @IsNotEmpty({ message: 'A senha do usuário precisa ser preenchida.' })
  @Column()
  public password: string;

  @IsNotEmpty({ message: 'A pessoa precisa ser vinculada.' })
  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  public person: Person;
}
