import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Users } from './Users';
import { UserService } from './user.service';
import { randomUUID } from 'crypto';
@Resolver(of => Users)
export class UserResolver {

  constructor(private readonly userService: UserService) { }

  @Query(returns => Users)
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.getById(id);
  }

  @Query((type) => [Users], { name: `users` })
  async findAll(@Args('limit', { nullable: true, type: () => Int }) limit: number): Promise<Users[]> {
    const users = await this.userService.getAll()
    if (limit == null || limit > users.length) return users;
    users.length = limit;
    return users;
  }  
  
  @ResolveField()
  async groups(@Parent() user: Users) {
    return this.userService.getGroups(user);
  }

  @Mutation(returns => Users)
  async addUser(
    @Args('login', { type: () => String }) login: string,
    @Args('password', { type: () => String }) password: string = '',
    @Args('firstname', { type: () => String }) firstname: string = '',
    @Args('secondname', { type: () => String }) secondname: string = '',
    @Args('lastname', { type: () => String }) lastname: string = '',
    @Args('uid', { type: () => String }) uid: string = randomUUID(),
    @Args('isActive', { type: () => Boolean }) isActive: boolean = false,
  ): Promise<Users> {
    await this.userService.create(new Users(login, password, firstname, secondname, lastname, isActive, uid));
    const result = await (await this.userService.getAll()).find(x => x.login == login);
    return result;
  }

  @Mutation(returns => Boolean)
  async deleteUser(
    @Args('id', { type: () => ID }) id: number
  ) {
    await this.userService.delete(id);
    return true;
  }
}