import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateUserDtoV1 } from './create-user.dto';

export class UpdateUserDtoV1 extends OmitType(PartialType(CreateUserDtoV1), [
  'userEmail',
]) {}
