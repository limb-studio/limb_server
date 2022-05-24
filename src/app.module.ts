import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import config from './mikro-orm.config';
import { FileModule } from './file/file.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DocumentModule } from './document/document.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [UserModule,
    MikroOrmModule.forRoot(config),
    GroupModule, 
    FileModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true
      },
    }), DocumentModule
  ]
})
export class AppModule { }
