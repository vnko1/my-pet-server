import { Controller, Get, Req, UseFilters, UseGuards } from '@nestjs/common';
import { MongooseExceptionFilter } from 'src/common';
import { RoleGuard } from '../guard/notices.guard';

@Controller('notices')
@UseFilters(MongooseExceptionFilter)
export class NoticesController {
  constructor() {}
  @UseGuards(RoleGuard);
  @Get()
  async getAllNotices(@Req() req) {
    return req.user?.id;
  }
}
