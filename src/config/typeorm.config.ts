import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ENV_VARIABLES } from './env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ENV_VARIABLES.DB_HOST,
  port: ENV_VARIABLES.DB_PORT,
  username: ENV_VARIABLES.DB_USERNAME,
  password: ENV_VARIABLES.DB_PASSWORD,
  database: ENV_VARIABLES.DB_DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
