import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { Group } from './group.entity';

@Entity()
export class GroupUser {

  @ManyToOne({ entity: () => Group, primary: true })
  group!: Group;

  @ManyToOne({ entity: () => User, primary: true })
  user!: User;

  @Property({ nullable: true })
  relation?: number;

  constructor(data: Partial<GroupUser>) {
    this.group = data.group;
    this.user = data.user;
    this.relation = data.relation || 0;
  }
}
