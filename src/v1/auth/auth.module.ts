import { Global, Module } from '@nestjs/common';

import { AuthControllerV1 } from './auth.controller';
import { AuthServiceV1 } from './auth.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  controllers: [AuthControllerV1],
  providers: [AuthServiceV1],
  exports: [AuthServiceV1],
})
export class AuthModule {}
