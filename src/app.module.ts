import { Module } from '@nestjs/common';

import { AppController, AppService } from './app';
import { TestController } from './test';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
