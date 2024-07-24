import { Logger } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';

import { encryptPassword } from '../helpers';
import { User } from '../v1/users/entities/user.entity';

export async function userSeeder(dataSource: DataSource) {
  const userData: DeepPartial<User> = {
    userName: 'admin',
    userEmail: 'admin@gmail.com',
    userPassword: await encryptPassword('admin@123'),
    userRole: 'admin',
  };

  const userRepository = dataSource.getRepository(User);
  await userRepository.save(userData);

  Logger.log('user data seeded');
}
