import { Entity, PrimaryKey, Property, UuidType } from '@mikro-orm/core';
import { first } from 'rxjs';

@Entity()
export class Users {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text', nullable: true })
  login?: string;

  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Property({ columnType: 'text', nullable: true })
  firstname?: string;

  @Property({ columnType: 'text', nullable: true })
  secondname?: string;

  @Property({ columnType: 'text', nullable: true })
  lastname?: string;

  @Property({ columnType: 'uuid', nullable: true })
  uid?: string;

  @Property({ nullable: true })
  isActive?: boolean;

  constructor(login: string, password: string, firstname: string, secondname: string, lastname: string, isActive: boolean, uid: string) {
    this.login = login;
    this.password = password;
    this.firstname = firstname;
    this.secondname = secondname;
    this.lastname = lastname;
    this.isActive = isActive;
    this.uid = uid;
  }
}
