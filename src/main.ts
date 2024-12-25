import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setUpDocumentation from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Init the documentation setup for the app
  setUpDocumentation(app);

  await app.listen(3000);
}
bootstrap();
