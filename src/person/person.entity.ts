import { IsNotEmpty, Max, Min } from "class-validator";
import { Address } from "src/address/address.entity";
import { Contact } from "src/contact/contact.entity";
import { EnterprisePerson } from "src/enterprise-person/enterprise-person.entity";
import { IndividualPerson } from "src/individual-person/individual-person.entity";
import { Column, Entity, In, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty({ message: 'O tipo de pessoa precisa ser preenchido.' })
  @Min(1, { message: 'Valor tipo incorreto.' })
  @Max(2, { message: 'Valor tipo incorreto.' })
  @Column()
  public type: number;

  @OneToOne(() => IndividualPerson)
  @JoinColumn({ name: 'individual_person_id' })
  public individual: IndividualPerson;
  
  @OneToOne(() => EnterprisePerson)
  @JoinColumn({ name: 'enterprise_person_id' })
  public enterprise: EnterprisePerson;
  
  @IsNotEmpty({ message: 'O endereço da pessoa precisa ser vinculado.' })
  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  public address: Address;
  
  @IsNotEmpty({ message: 'O contato da pessoa precisa ser vinculado.' })
  @OneToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  public contact: Contact;
}