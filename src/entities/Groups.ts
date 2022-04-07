import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Groups {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text', nullable: true })
  name?: string;

  @Property({ columnType: 'uuid', nullable: true })
  ownerUid?: string;

  @Property({ nullable: true })
  type?: number;

  @Property({ columnType: 'uuid', nullable: true })
  uid?: string;

  @Property({ nullable: true })
  isActive?: boolean;

}
