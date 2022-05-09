import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Users } from '../user/Users';

@Entity()
export class FileVersions {

  @PrimaryKey({ columnType: 'int8' })
  id!: string;

  @Property({ columnType: 'text' })
  folderName!: string;

  @Property({ columnType: 'text' })
  fileName!: string;

  @Property({ columnType: 'int8' })
  size!: string;

  @Property({ columnType: 'text' })
  hash!: string;

  @ManyToOne({ entity: () => Users })
  author!: Users;

  @Property({ length: 6 })
  creationDate!: Date;

}
