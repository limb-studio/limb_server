import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileBundles } from '../file/FileBundles';
import { Users } from '../user/Users';

@Entity()
export class Documents {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  name!: string;

  @ManyToOne({ entity: () => Users, index: 'fki_author_ref' })
  author!: Users;

  @Property({ columnType: 'text', nullable: true })
  serial?: string;

  @ManyToOne({ entity: () => FileBundles, nullable: true })
  fileBundleCurrent?: FileBundles;

}
