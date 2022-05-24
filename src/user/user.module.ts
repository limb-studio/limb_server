import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { GroupService } from 'src/group/group.service';

@Module({
  providers: [UserResolver, UserService, GroupService]
})
export class UserModule {}
