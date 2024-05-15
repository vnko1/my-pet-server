import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles';

@Module({
  imports: [ConfigModule.forRoot(), ArticlesModule],
})
export class AppModule {}
