import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
