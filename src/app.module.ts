import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import config from './mikro-orm.config';

@Module({
  imports: [UserModule,
    MikroOrmModule.forRoot(config),
    GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
