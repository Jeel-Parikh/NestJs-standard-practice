import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { Serializer } from './../../common/interceptors/serialize.interceptor';
import { genResponse } from './../../helpers';
import { ResUserDtoV1 } from './dto';
import { CreateUserDtoV1 } from './dto/create-user.dto';
import { UpdateUserDtoV1 } from './dto/update-user.dto';
import { UsersServiceV1 } from './users.service';

@Serializer(ResUserDtoV1)
@Controller({ path: 'users', version: '1' })
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersServiceV1) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDtoV1) {
    const user = await this.usersService.create(createUserDto);
    return genResponse(user, 'user created successfully');
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return genResponse(users, 'users fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id });
    return genResponse(user, 'user fetched successfully');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDtoV1,
  ) {
    const updatedUser = await this.usersService.update({ id }, updateUserDto);
    return genResponse(updatedUser, 'user updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.remove({ id });
    return genResponse(deletedUser, 'user deleted successfully');
  }
}
