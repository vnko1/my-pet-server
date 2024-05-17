import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';

import {
  CreateUserDto,
  createUserSchema,
} from 'src/modules/users/dto/users.dto';

import { MongooseExceptionFilter, ZodValidationPipe } from 'src/common';
import { AuthService } from '../service/auth.service';
import { SignInDto, signInSchema } from '../dto/signIn.dto';

@Controller('auth')
@UseFilters(MongooseExceptionFilter)
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
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const cred = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.cookie('refresh_token', cred.refresh_token, {
      httpOnly: true,
      secure: true,
    });
    return res.send({ access_token: cred.access_token });
  }
}
