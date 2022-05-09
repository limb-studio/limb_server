import { Injectable } from '@nestjs/common';
import { IPrimaryKey, MikroORM, UuidType } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Users } from './Users';
import { throwError } from 'rxjs';
import { Groups } from 'src/group/Groups';
import { GroupUsers } from 'src/group/GroupUsers';

@Injectable()
export class UserService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) { }
  async getAll(): Promise<Users[]> {
    try {
      const users = await this.em.find(Users, {});
      users.forEach((x) => (x.password = null));
      return users;
    } catch (e) {
      return e;
    }
  }

  async getById(id: number): Promise<Users> {
    try {
      const user = await this.em.findOneOrFail(Users, { id: id });
      user.password = null;
      return user;
    } catch (e) {
      return e;
    }
  }

  async getByUid(uid: string): Promise<Users> {
    try {
      const user = await this.em.findOne(Users, { uid: uid });
      user.password = null;
      return user;
    } catch (e) {
      return e;
    }
  }

  async create(u: Users) {
    try {
      const exists = this.em.findOne(Users, { $or: [{ login: u.login }, { uid: u.uid }] });
      if (exists != null) {
        const user = new Users(
          u.login,
          u.password,
          u.firstname,
          u.secondname,
          u.lastname,
          u.isActive,
          u.uid,
        );
        await this.em.persistAndFlush(user);
      } else throw Error("Already exists");
    }
    catch (e) {
      return e;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.em.nativeDelete(Users, { id: id });
      this.em.flush();
    } catch (e) {
      return e;
    }
  }

  async getGroups(id: number): Promise<Groups[]> {
    try {
      const user = await this.em.findOne(Users, { id: id });
      const relations = await this.em.find(GroupUsers, { user: user });
      let groups: Groups[] = new Array(relations.length);
      await this.em.populate(relations, ['group']);
      relations.map((value, index) => {
        groups[index] = value.group;
      })
      return groups;
    } catch (e) {
      return e;
    }
  }


}
