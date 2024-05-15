import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesQueryDto } from '../dto/articles-query.dto';
import { ArticlesService } from '../service/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}
  @Get()
  getArticles(@Query() query: ArticlesQueryDto) {
    return this.articlesService.findAll(query);
  }
}
