import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticlesDto } from 'src/dto';

@Controller('articles')
export class Articles {
  @Post()
  getAllArticles(@Query() query: any, @Body() body: ArticlesDto) {
    console.log('🚀 ~ Articles ~ getAllArticles ~ body:', body);
    console.log('🚀 ~ Articles ~ getAllArticles ~ query:', query);

    return 'Hello';
  }
}
