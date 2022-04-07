import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class GroupUsers {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid', nullable: true })
  groupUid?: string;

  @Property({ columnType: 'uuid', nullable: true })
  userUid?: string;

  @Property({ nullable: true })
  relation?: number;

}
