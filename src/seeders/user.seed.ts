import { Logger } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';

import { ENV_VARIABLES } from '../config';
import { hashPassword } from '../helpers';
import { User } from '../v1/users/entities/user.entity';
import { EUsersRole } from '../v1/users/types/user.type';

export async function userSeeder(dataSource: DataSource) {
  const passwordHash = await hashPassword(ENV_VARIABLES.ADMIN_PASSWORD);
  const userData: DeepPartial<User> = {
    userName: ENV_VARIABLES.ADMIN_NAME,
    userEmail: ENV_VARIABLES.ADMIN_EMAIL,
    userPassword: passwordHash,
    userRole: EUsersRole.ADMIN,
  };

  const userRepository = dataSource.getRepository(User);
  await userRepository.save(userData);

  Logger.log('user data seeded');
}
