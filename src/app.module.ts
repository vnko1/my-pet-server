import { Module } from '@nestjs/common';

import { AppTestModule } from './app';
import { TestModule } from './test';

@Module({
  imports: [TestModule, AppTestModule],
})
export class AppModule {}
