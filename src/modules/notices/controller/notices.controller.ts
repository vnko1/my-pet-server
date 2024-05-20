import {
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { IUserId } from 'src/types';

@Controller('notices')
@UseFilters(MongooseExceptionFilter)
export class NoticesController {
  constructor() {}

  @Get()
  async getAllNotices(@Req() req: Partial<IUserId>) {
    return req?.user.id;
  }

  @UseGuards(AuthGuard)
  @Post()
  async addNotice() {}
}
