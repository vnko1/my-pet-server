import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  CreateUserDto,
  createUserSchema,
} from 'src/modules/users/dto/users.dto';

import { AuthService } from '../service/auth.service';
import { AuthExceptionFilter } from '../exception/auth.exception';
import { ZodValidationPipe } from 'src/services';
import { SignInDto, signInSchema } from '../dto/signIn.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
