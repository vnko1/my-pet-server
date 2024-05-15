import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { TestDto } from '../dto/test.dto';

@Controller('articles')
export class TestController {
  @Post(':id')
  getAllArticles(
    @Query() query: any,
    @Body() body: TestDto,
    @Param('id') id: string,
  ) {
    console.log('🚀 ~ Articles ~ id:', id);
    console.log('🚀 ~ Articles ~ getAllArticles ~ body:', body);
    console.log('🚀 ~ Articles ~ getAllArticles ~ query:', query);

    return 'Hello';
  }
}
