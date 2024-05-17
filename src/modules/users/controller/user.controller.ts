import {
  Controller,
  Get,
  Put,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, MongooseExceptionFilter } from 'src/common';

@Controller('profile')
@UseFilters(MongooseExceptionFilter)
export class UserController {
  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Put()
  updateProfile() {}
}
