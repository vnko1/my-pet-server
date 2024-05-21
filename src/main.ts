import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppHttpExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new AppHttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Your pet api')
    .setDescription('The pets API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://your-pet-server-bolc.onrender.com/', 'Production')
    .addTag('pets')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
