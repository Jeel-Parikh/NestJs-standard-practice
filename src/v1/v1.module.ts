import { Module } from '@nestjs/common';
import { UsersControllerV1 } from './users/users.controller';
import { UsersServiceV1 } from './users/users.service';

@Module({
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
})
export class V1Module {}
