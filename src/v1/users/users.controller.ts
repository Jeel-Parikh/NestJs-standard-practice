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

import { Serializer } from './../../common/interceptors';
import { genResponse } from './../../helpers';
import { QueryParamsUserDtoV1, ResUserDtoV1 } from './dto';
import { CreateUserDtoV1 } from './dto/create-user.dto';
import { UpdateUserDtoV1 } from './dto/update-user.dto';
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
  async create(@Body() createUserDto: CreateUserDtoV1) {
    const user = await this.usersService.create(createUserDto);
    return genResponse(user, 'user created successfully');
  }

  @RoleV1(EUsersRole.ADMIN, EUsersRole.USER)
  @Get()
  async findAll(@Query() query: QueryParamsUserDtoV1) {
    const { offset = 0, limit = 10, ...conditions } = query;
    const users = await this.usersService.findAll(conditions, {
      limit,
      offset,
    });
    return genResponse(users, 'users fetched successfully');
  }

  @Get(':id') // no Authorization applied
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id });
    return genResponse(user, 'user fetched successfully');
  }

  @RoleV1(EUsersRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDtoV1,
  ) {
    const updatedUser = await this.usersService.update({ id }, updateUserDto);
    return genResponse(updatedUser, 'user updated successfully');
  }

  @RoleV1(EUsersRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.remove({ id });
    return genResponse(deletedUser, 'user deleted successfully');
  }
}
