import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setUpDocumentation from './docs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup the validation pipe globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Init the documentation setup for the app
  setUpDocumentation(app);

  await app.listen(3000);
}
bootstrap();
