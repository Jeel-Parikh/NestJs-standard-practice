import { Logger } from '@nestjs/common';

import { userSeeder } from './user.seed';
import { AppDataSource } from '../config';

async function runSeeder() {
  try {
    const dataSource = await AppDataSource.initialize();
    await userSeeder(dataSource);
    await dataSource.destroy();
  } catch (err) {
    Logger.error(`Something went wrong while seeding data ${err.message}`);
    process.exit(1);
  }
}

runSeeder();
