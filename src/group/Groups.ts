import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Groups {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  name!: string;

  @Property({ columnType: 'uuid' })
  ownerUid!: string;

  @Property()
  type!: number;

  @Unique({ name: 'unique_group_uid' })
  @Property({ columnType: 'uuid' })
  uid!: string;

  @Property()
  isActive!: boolean;

  constructor(name: string, ownerUid: string, type: number, isActive: boolean, uid: string) {
    this.name = name;
    this.ownerUid = ownerUid;
    this.type = type;
    this.isActive = isActive;
    this.uid = uid;
  }
}
