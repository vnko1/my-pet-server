import { Module } from '@nestjs/common';

import { AppController, AppService } from './app';
import { TestModule } from './test';

@Module({
  imports: [TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
