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

    async getByUid(uid: string): Promise<Groups> {
        try {
            const user = await this.em.findOne(Groups, { uid: uid });
            return user;
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

    async appendUser(id: number, uid: string): Promise<void> {
        try {
            const group = await this.getById(id);
            const exists = await this.em.findOne(GroupUsers, { $and: [{ groupUid: group.uid }, { userUid: uid }] });
            if (exists != null) {
                const relation = new GroupUsers(group.uid, uid, 0);
                await this.em.persistAndFlush(relation);
            } else throw Error("Already exists");
        } catch (e) {
            return e;
        }
    }

    async getUsers(id: number): Promise<Users[]> {
        try {
            const group = await this.getById(id);
            const relations = await this.em.find(GroupUsers, { groupUid: group.uid });
            var users: Users[];
            relations.forEach(async u => {
                console.log(u.id);
                var user = await this.em.findOne(Users, { uid: u.userUid });
                users.push();
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
