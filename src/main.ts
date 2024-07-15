import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_VARIABLES } from './config/env.config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(ENV_VARIABLES.PORT || 3000);
}
bootstrap();
