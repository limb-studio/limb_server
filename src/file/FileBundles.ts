import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileVersions } from './FileVersions';
import { Users } from '../user/Users';

@Entity()
export class FileBundles {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'int2', nullable: true })
  index?: number;

  @Property({ length: 6 })
  dateCreated!: Date;

  @ManyToOne({ entity: () => Users })
  author!: Users;

  @ManyToOne({ entity: () => FileBundles, nullable: true })
  parent?: FileBundles;

  @Property({ columnType: 'text', nullable: true })
  title?: string;

  @ManyToMany({ entity: () => FileVersions, pivotTable: 'file_bundle_files', joinColumns: ['bundle_id', 'bundle_id', 'bundle_id', 'bundle_id', 'bundle_id', 'bundle_id', 'bundle_id', 'bundle_id', 'bundle_id'], inverseJoinColumn: 'file_version_id' })
  fileBundleFiles = new Collection<FileVersions>(this);
}
