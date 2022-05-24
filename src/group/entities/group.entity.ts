import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@Entity()
@ObjectType()
export class Group {

  @Field(() => Int, {description: 'ID of group'})
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ columnType: 'text' })
  name!: string;

  @Field()
  @Property({ columnType: 'uuid' })
  ownerUid: string;

  @Field()
  @Property()
  type!: number;

  @Field()
  @Unique({ name: 'unique_group_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Field()
  @Property()
  isActive!: boolean;

  @Field(() => [User])
  users: User[];

  constructor(name: string, ownerUid: string, type: number, isActive: boolean, uid: string) {
    this.name = name;
    this.ownerUid = ownerUid;
    this.type = type;
    this.isActive = isActive;
    this.uid = uid;
  }
}