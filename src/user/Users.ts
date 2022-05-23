import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Groups } from 'src/group/Groups';

@Entity()
@ObjectType()
export class Users {

  @Field(type => ID, {nullable: false})
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  login?: string;

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  secondname?: string;

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  lastname?: string;

  @Field({ nullable: false })
  @Unique({ name: 'unique_user_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Field({ nullable: false })
  @Property()
  isActive!: boolean;

  @Field(type => [Groups], {nullable: true})
  groups: Groups[];
  
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
