import { Options } from '@mikro-orm/core';
import { Groups } from './group/Groups';
import { GroupUsers } from './group/GroupUsers';
import { Users } from './user/Users';

const mikroOrmConfig: Options = {
    entities: [Users, Groups, GroupUsers],
      dbName: 'limb',
      type: 'postgresql',
      user: 'aleksandr',
      port: 5432,
      password: '555465',
      host: 'localhost'
  };
  
  export default mikroOrmConfig;