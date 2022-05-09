import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

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

  @Unique({ name: 'unique_user_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Property()
  isActive!: boolean;

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
