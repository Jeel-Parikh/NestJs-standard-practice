import { OmitType } from '@nestjs/mapped-types';

import { User } from '../entities/user.entity';

export class CreateUserDtoV1 extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
