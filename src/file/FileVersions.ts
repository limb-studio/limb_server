import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';

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

  @ManyToOne({ entity: () => User })
  author!: User;

  @Property({ length: 6 })
  creationDate!: Date;

}
