import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';

import {
  CreateUserDto,
  createUserSchema,
} from 'src/modules/users/dto/users.dto';

import { AuthService } from '../service/auth.service';
import { AuthExceptionFilter } from '../exception/auth.exception';
import { ZodValidationPipe } from 'src/services';

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
