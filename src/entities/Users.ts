import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

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

}
