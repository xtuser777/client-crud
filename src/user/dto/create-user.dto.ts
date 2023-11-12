import { IsNotEmpty, Length } from "class-validator";
import { Person } from "src/person/person.entity";

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome de usuário precisa ser preenchido.' })
  @Length(2, 20, { message: 'O nome de usuário deve conter entre 2 e 20 caracteres.' })
  public login: string;

  @IsNotEmpty({ message: 'A senha do usuário precisa ser preenchida.' })
  @Length(6, 6, { message: 'A senha do usuário deve conter 6 caracteres.' })
  public password: string;

  @IsNotEmpty({ message: 'A pessoa precisa ser vinculada.' })
  public person: Person;
}
