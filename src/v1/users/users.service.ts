import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPaginationParams } from './../../common/interfaces';
import { encryptPassword } from './../../helpers/password.helper';
import { ConditionUserDtoV1 } from './dto';
import { CreateUserDtoV1 } from './dto/create-user.dto';
import { UpdateUserDtoV1 } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersServiceV1 {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDtoV1) {
    try {
      const isExist = await this.exists({
        userEmail: createUserDto.userEmail,
      });
      if (isExist) {
        throw new BadRequestException(
          'User is already registered with same email',
        );
      }
      createUserDto.userPassword = await encryptPassword(
        createUserDto.userPassword,
      );
      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(
    conditions: ConditionUserDtoV1 = {},
    pagination: IPaginationParams = {},
  ) {
    try {
      // add total count in response
      const users = await this.usersRepository.find({
        where: conditions,
        skip: pagination.offset,
        take: pagination.limit,
      });
      return users;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOne(conditions: ConditionUserDtoV1) {
    try {
      const user = await this.usersRepository.findOneByOrFail(conditions);
      return user;
    } catch (err) {
      throw new NotFoundException('Invalid user data');
    }
  }

  async update(conditions: ConditionUserDtoV1, updateUserDto: UpdateUserDtoV1) {
    try {
      if (updateUserDto.userPassword) {
        updateUserDto.userPassword = await encryptPassword(
          updateUserDto.userPassword,
        );
      }
      const updatedRes = await this.usersRepository.update(
        conditions,
        updateUserDto,
      );
      if (!updatedRes.affected) {
        throw new NotFoundException('Invalid user');
      }
      const users = await this.findAll(conditions);
      return users;
    } catch (err) {
      throw new HttpException(
        err.response || err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(conditions: ConditionUserDtoV1) {
    try {
      const users = await this.findAll(conditions);
      if (!users.length) {
        throw new NotFoundException('Invalid user');
      }
      const deletedUsers = await this.usersRepository.remove(users);
      return deletedUsers;
    } catch (err) {
      throw new HttpException(
        err.response || err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async exists(conditions: ConditionUserDtoV1) {
    const isExists = await this.usersRepository.existsBy(conditions);
    return isExists;
  }
}
