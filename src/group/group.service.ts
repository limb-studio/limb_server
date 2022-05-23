import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/user/Users';
import { Groups } from './Groups';
import { GroupUsers } from './GroupUsers';

@Injectable()
export class GroupService {
    constructor(
        private readonly orm: MikroORM,
        private readonly em: EntityManager,
    ) { }

    async getAll(): Promise<Groups[]> {
        try {
            const groups = await this.em.find(Groups, {});
            return groups;
        } catch (e) {
            return e;
        }
    }

    async getById(id: number): Promise<Groups> {
        try {
            const group = await this.em.findOneOrFail(Groups, { id: id });
            return group;
        } catch (e) {
            return e;
        }
    }

    async create(u: Groups) {
        try {
            const exists = this.em.findOne(Groups, { $or: [{ uid: u.uid }, { name: u.name }] });
            if (exists != null) {
                const group = new Groups(
                    u.name,
                    u.ownerUid,
                    u.type,
                    u.isActive,
                    u.uid,
                );
                await this.em.persistAndFlush(group);
            } else throw Error("Already exists");
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }

    async appendUser(id: number, userid: number): Promise<void> {
        try {
            const group = await this.em.findOne(Groups, {id:id});
            const user = await this.em.findOne(Users, {id:userid});
            const exists = await this.em.findOne(GroupUsers, { $and: [{group : group}, {user: user}]});
            if (exists == null) {
                const gu = this.em.create(GroupUsers, {group: group, user: user, relation: 0})
                await this.em.persistAndFlush(gu);
            } else throw Error("Already exists");
        } catch (e) {
            return e;
        }
    }

    async getUsers(group: Groups): Promise<Users[]> {
        try {
            const relations = await this.em.find(GroupUsers, { group: group });
            let users: Users[] = new Array(relations.length);
            await this.em.populate(relations, ['user']);
            relations.map((value, index) => {
                value.user.password = null;
                users[index] = value.user;
            })
            return users;
        } catch (e) {
            return e;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.em.nativeDelete(Groups, { id: id });
            this.em.flush();
        } catch (e) {
            return e;
        }
    }
}
