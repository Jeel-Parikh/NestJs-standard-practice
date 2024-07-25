import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { IPaginationRes, IResponse } from '@/src/common/interfaces';

import { Serializer } from './../../common/interceptors';
import { QueryParamsUserDtoV1, ResUserDtoV1 } from './dto';
import { CreateUserDtoV1 } from './dto/create-user.dto';
import { UpdateUserDtoV1 } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EUsersRole } from './types/user.type';
import { UsersServiceV1 } from './users.service';
import { AuthenticationV1, RoleV1 } from '../auth/decorators';

@Serializer(ResUserDtoV1)
// @RoleV1(EUsersRole.ADMIN)  // Always place @Role above @Authentication bcz it is depends on @Authentication
@AuthenticationV1() // Authentication decorator
@Controller({ path: 'users', version: '1' })
@UseInterceptors(CacheInterceptor) // Only GET endpoints are cached
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersServiceV1) {}

  @RoleV1(EUsersRole.ADMIN) // only admin users can access
  @Post()
  async create(
    @Body() createUserDto: CreateUserDtoV1,
  ): Promise<IResponse<User>> {
    const user = await this.usersService.create(createUserDto);
    return {
      data: user,
      message: 'user created successfully',
    };
  }

  @RoleV1(EUsersRole.ADMIN, EUsersRole.USER)
  @Get()
  async findAll(
    @Query() query: QueryParamsUserDtoV1,
  ): Promise<IPaginationRes<User>> {
    const { offset = 0, limit = 10, ...conditions } = query;
    const { users, count } = await this.usersService.findAll(conditions, {
      limit,
      offset,
    });
    return {
      data: users,
      message: 'users fetched successfully',
      meta: {
        count,
      },
    };
  }

  @Get(':id') // no Authorization applied
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<User>> {
    const user = await this.usersService.findOne({ id });
    return { data: user, message: 'user fetched successfully' };
  }

  @RoleV1(EUsersRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDtoV1,
  ): Promise<IResponse<User>> {
    const updatedUser = await this.usersService.update({ id }, updateUserDto);
    return { data: updatedUser, message: 'user updated successfully' };
  }

  @RoleV1(EUsersRole.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<User>> {
    const deletedUser = await this.usersService.remove({ id });
    return { data: deletedUser, message: 'user deleted successfully' };
  }
}
