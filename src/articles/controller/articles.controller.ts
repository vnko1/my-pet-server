import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesQueryDto } from '../dto/articles-query.dto';

@Controller('articles')
export class ArticlesController {
  @Get()
  getArticles(@Query() query: ArticlesQueryDto) {
    console.log(process.env.DB_ACCESS_URI);
    console.log(query.page);
    console.log(query.query);
  }
}
