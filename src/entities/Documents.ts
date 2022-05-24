import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { FileBundles } from '../file/FileBundles';

@Entity()
export class Documents {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text' })
  name!: string;

  @ManyToOne({ entity: () => User, index: 'fki_author_ref' })
  author!: User;

  @Property({ columnType: 'text', nullable: true })
  serial?: string;

  @ManyToOne({ entity: () => FileBundles, nullable: true })
  fileBundleCurrent?: FileBundles;

}
