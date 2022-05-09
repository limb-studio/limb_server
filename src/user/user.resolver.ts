import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(of => User)
export class UserResolver {

    @Query(returns => User)
    async user(@Args('id', { type: () => ID }) id: number) {
        if (id == 1) return {id: 1, name: 'test'} as User
        else return {id: 2, name: 'test2'} as User
  }
}
