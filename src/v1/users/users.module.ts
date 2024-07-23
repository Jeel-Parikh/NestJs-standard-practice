import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
})
export class UsersModule {}
