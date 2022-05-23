import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/user/Users';

@Entity()
@ObjectType()
export class Groups {

  @Field(type => ID, {nullable: false})
  @PrimaryKey()
  id!: number;

  @Field({ nullable: true })
  @Property({ columnType: 'text' })
  name!: string;

  @Field({ nullable: true })
  @Property({ columnType: 'uuid' })
  ownerUid!: string;

  @Field({ nullable: true })
  @Property()
  type!: number;

  @Field({ nullable: true })
  @Unique({ name: 'unique_group_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Field({ nullable: true })
  @Property()
  isActive!: boolean;

  @Field(type => [Users], {nullable: true})
  users: Users[];

  constructor(name: string, ownerUid: string, type: number, isActive: boolean, uid: string) {
    this.name = name;
    this.ownerUid = ownerUid;
    this.type = type;
    this.isActive = isActive;
    this.uid = uid;
  }
}
