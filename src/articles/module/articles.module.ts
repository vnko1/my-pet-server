import { Module } from '@nestjs/common';
import { ArticlesController } from '../controller/articles.controller';

@Module({
  controllers: [ArticlesController],
})
export class ArticlesModule {}
