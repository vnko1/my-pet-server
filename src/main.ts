import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppHttpExceptionFilter } from './services/exceptions/app.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AppHttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
