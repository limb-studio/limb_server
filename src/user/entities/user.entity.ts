import { Entity, PrimaryKey, Property, Unique, UuidType } from '@mikro-orm/core';
import { BadRequestException, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { IsUUID } from 'class-validator';

@Entity()
@ObjectType()
export class User {

  @Field(() => Int, { description: 'User ID' })
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ columnType: 'text', nullable: true })
  login?: string;

  @Field()
  @Property({ columnType: 'text', nullable: true })
  password?: string;

  @Field()
  @Property({ columnType: 'text', nullable: true })
  firstname?: string;

  @Field()
  @Property({ columnType: 'text', nullable: true })
  secondname?: string;

  @Field()
  @Property({ columnType: 'text', nullable: true })
  lastname?: string;

  @Field()
  @IsUUID()
  @Unique({ name: 'unique_user_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Field()
  @Property()
  isActive!: boolean;

  @Field()
  @Property()
  fullname!: string;

  @Field(() => [Group])
  groups!: Group[];
  
  constructor(input: CreateUserInput) {
    try {
      this.login = input.login;
      this.password = input.password;
      this.firstname = input.firstname;
      this.secondname = input.secondname;
      this.lastname = input.lastname;
      this.isActive = input.isActive;
      this.uid = input.uid;
    }
    catch (e) {
      throw new HttpException("Bad Input", HttpStatus.BAD_REQUEST)
    }
  }
  
}