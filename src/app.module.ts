import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Articles } from './controllers';

@Module({
  imports: [],
  controllers: [AppController, Articles],
  providers: [AppService],
})
export class AppModule {}
