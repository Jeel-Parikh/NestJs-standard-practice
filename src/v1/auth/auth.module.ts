import { Module } from '@nestjs/common';

import { AuthControllerV1 } from './auth.controller';
import { AuthServiceV1 } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthControllerV1],
  providers: [AuthServiceV1],
})
export class AuthModule {}
