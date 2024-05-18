import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { multerStorageConfig } from 'src/utils';

import { UpdateUserDto, updateUserSchema } from '../dto/updateUser.dto';
import { UsersService } from '../service/users.service';

@Controller('profile')
@UseFilters(MongooseExceptionFilter)
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage(multerStorageConfig),
    }),
  )
  async updateProfile(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const parsedSchema = updateUserSchema.safeParse({
      ...updateUserDto,
      avatar,
    });

    if (!parsedSchema.success) throw new BadRequestException();

    return await this.userService.updateUser('1', parsedSchema.data);
  }
}
