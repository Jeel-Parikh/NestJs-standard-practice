import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { UsersControllerV1 } from './users/users.controller';
import { UsersServiceV1 } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
})
export class V1Module {}
