import { PartialType } from '@nestjs/mapped-types';

import { User } from '../entities/user.entity';

export class ConditionUserDtoV1 extends PartialType(User) {}
