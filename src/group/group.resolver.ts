import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Groups } from './Groups';
import { Users } from 'src/user/Users';
import { randomUUID } from 'crypto';

@Resolver(of => Groups)
export class GroupResolver {

    constructor(private readonly groupService: GroupService) { }

    @Query(returns => Groups)
    async group(@Args('id', { type: () => ID }) id: number) {
        return await this.groupService.getById(id);
    }

    @Query((type) => [Groups], { name: `groups` })
    async findAll(@Args('limit', { nullable: true, type: () => Int }) limit: number): Promise<Groups[]> {
        const groups = await this.groupService.getAll()
        if (limit == null || limit > groups.length) return groups;
        groups.length = limit;
        return groups;
    }

    @ResolveField()
    async users(@Parent() group: Groups) {
        return this.groupService.getUsers(group);
    }

    @Mutation(returns => Groups)
    async addGroup(
        @Args('name', { type: () => String }) name: string,
        @Args('ownerUid', { type: () => String }) ownerUid: string,
        @Args('type', { type: () => Number }) type: number = 0,
        @Args('uid', { type: () => String }) uid: string = randomUUID(),
        @Args('isActive', { type: () => Boolean }) isActive: boolean = false,
    ): Promise<Groups> {
        await this.groupService.create(new Groups(name, ownerUid, type, isActive, uid));
        const result = await (await this.groupService.getAll()).find(x => x.name == name);
        return result;
    }

    @Mutation(returns => Boolean)
    async deleteGroup(
        @Args('id', { type: () => ID }) id: number
    ) {
        await this.groupService.delete(id);
        return true;
    }

    /*@Put(':id/appendUser')
    async appendUser(@Param() params, @Query() query) {
      await this.groupService.appendUser(params.id, query.userid)
  }*/
}
