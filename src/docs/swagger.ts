import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Booking service API')
  .setDescription('The booking service API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('booking')
  .build();

const setUpDocumentation = (app: INestApplication) => {
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
};

export default setUpDocumentation;
