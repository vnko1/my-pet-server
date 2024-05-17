import {
  Body,
  // ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';

import {
  CreateUserDto,
  createUserSchema,
} from 'src/modules/users/dto/users.dto';
import { ZodValidationPipe } from 'src/modules/users/pipe/users.pipe';

import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
    // try {
    // } catch (error) {
    //   throw new ConflictException(error.message);
    // }
  }
}
