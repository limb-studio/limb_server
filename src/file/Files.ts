import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Files {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ nullable: true })
  versionIds?: string[];

  @Property({ columnType: 'text' })
  title!: string;

  @Property({ columnType: 'text' })
  filename!: string;

  @Property({ columnType: 'text', nullable: true })
  extension?: string;

}
