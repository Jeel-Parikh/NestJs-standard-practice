import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ENV_VARIABLES } from './config/env.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true, // allow all origin all types of http req
    });

    app.setGlobalPrefix('api'); // add prefix in all http routes

    app.enableVersioning({
      type: VersioningType.URI,
    });
    const port = ENV_VARIABLES.PORT || 3000;
    await app.listen(port);
    Logger.log(`Listing on port: ${port}`, 'MAIN');
  } catch (err) {
    Logger.error(`Something went wrong: ${err.message}`);
  }
}
bootstrap();
