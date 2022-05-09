import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Groups } from './Groups';
import { Users } from '../user/Users';

@Entity()
export class GroupUsers {

  @ManyToOne({ entity: () => Groups, primary: true })
  group!: Groups;

  @ManyToOne({ entity: () => Users, primary: true })
  user!: Users;

  @Property({ nullable: true })
  relation?: number;

  constructor(data: Partial<GroupUsers>) {
    this.group = data.group;
    this.user = data.user;
    this.relation = data.relation || 0;
  }
}
