import { Exclude } from 'class-transformer';

import { User } from '../entities/user.entity';

export class ResUserDtoV1 extends User {
  @Exclude()
  userPassword: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
