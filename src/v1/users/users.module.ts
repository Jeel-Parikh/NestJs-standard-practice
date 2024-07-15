import { Module } from '@nestjs/common';

import { UsersControllerV1 } from './users.controller';
import { UsersServiceV1 } from './users.service';

@Module({
  controllers: [UsersControllerV1],
  providers: [UsersServiceV1],
})
export class UsersModule {}
