import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';

import {
  CreateUserDto,
  createUserSchema,
} from 'src/modules/users/dto/users.dto';
import { ZodValidationPipe } from 'src/modules/users/pipe/users.pipe';
import { AuthService } from '../service/auth.service';
import { AuthExceptionFilter } from '../exception/auth.exception';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
  }
}
