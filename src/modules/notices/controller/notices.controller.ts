import { Controller, Get, Req, UseFilters } from '@nestjs/common';
import { MongooseExceptionFilter } from 'src/common';

@Controller('notices')
@UseFilters(MongooseExceptionFilter)
export class NoticesController {
  constructor() {}

  @Get()
  async getAllNotices(@Req() req: { user?: { id?: string } }) {
    return req?.user?.id;
  }
}
