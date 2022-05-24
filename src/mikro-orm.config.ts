import { Options } from '@mikro-orm/core';
import { Group } from './group/entities/group.entity';
import { GroupUser } from './group/entities/groupuser.entity';
import { User } from './user/entities/user.entity';

const mikroOrmConfig: Options = {
    entities: [User, Group, GroupUser],
      dbName: 'limb',
      type: 'postgresql',
      user: 'aleksandr',
      port: 5432,
      password: '555465',
      host: 'localhost'
  };
  
  export default mikroOrmConfig;