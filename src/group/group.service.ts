import { EntityManager, MikroORM } from '@mikro-orm/core';
import { ObjectCriteriaNode } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupUser } from './entities/groupuser.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) { }

  async create(createGroupInput: CreateGroupInput) {
    const exists = await this.em.findOne(Group, { $or: [{ uid: createGroupInput.uid }, { name: createGroupInput.name }] });
    if (exists == null) {
      const group = new Group(
        createGroupInput.name,
        createGroupInput.ownerUid,
        createGroupInput.type,
        createGroupInput.isActive,
        createGroupInput.uid,
      );
      await this.em.persistAndFlush(group);
      return group;
    } else throw new HttpException("Group Name Already Exists", HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const groups = await this.em.find(Group, {});
    groups.sort((a, b) => a.id - b.id)
    return groups;
  }

  async findOne(id: number) {
    const group = await this.em.findOneOrFail(Group, { id: id });
    return group;
  }

  async findUsersByGroup(group: Group) {
    const relations = await this.em.find(GroupUser, { group: group });
    let users: User[] = new Array(relations.length);
    await this.em.populate(relations, ['user']);
    relations.map((value, index) => {
      value.user.password = null;
      users[index] = value.user;
    })
    return users;
  }

  async findGroupsByUser(user: User) {
    const relations = await this.em.find(GroupUser, { user: user });
      let groups: Group[] = new Array(relations.length);
      await this.em.populate(relations, ['group']);
      relations.map((value, index) => {
        groups[index] = value.group;
      })
      return groups;
  }

  async update(id: number, updateGroupInput: UpdateGroupInput) {
    const group = await this.findOne(id);
    Object.keys(group).forEach(element => {
      if (group[element] != updateGroupInput[element]) group[element] = updateGroupInput[element];
    });
    await this.em.persistAndFlush(group);
    return group;
  }

  async appendUser(id: number, userid: number) {
    const group = await this.em.findOne(Group, { id: id });
    const user = await this.em.findOne(User, { id: userid });
    const exists = await this.em.findOne(GroupUser, { $and: [{ group: group }, { user: user }] });
    if (exists == null) {
      const gu = this.em.create(GroupUser, { group: group, user: user, relation: 0 })
      await this.em.persistAndFlush(gu);
    } else throw Error("Already exists");
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    await this.em.nativeDelete(Group, { id: id });
    this.em.flush();
    return group;
  }
}
