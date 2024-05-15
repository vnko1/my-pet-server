import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';

@Module({ controllers: [AppController], providers: [AppService] })
export class AppTestModule {}
