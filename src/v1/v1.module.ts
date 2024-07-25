import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/src/v1/auth/auth.module';
import { User } from '@/src/v1/users/entities/user.entity';
import { UsersModule } from '@/src/v1/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class V1Module {}
