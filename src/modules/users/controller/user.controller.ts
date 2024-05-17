import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  AuthGuard,
  MongooseExceptionFilter,
  ZodValidationPipe,
} from 'src/common';

import { UpdateUserDto, updateUserSchema } from '../dto/updateUser.dto';

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
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  @UseInterceptors(FileInterceptor('avatar'))
  updateProfile(
    @UploadedFile() avatar: Express.Multer.File,
    // @Body() updateUserDto: UpdateUserDto,
  ) {
    const file = avatar.buffer;
    console.log('🚀 ~ UserController ~ avatar:', file);
  }
}
