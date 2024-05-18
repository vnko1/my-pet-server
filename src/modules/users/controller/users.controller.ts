import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { deleteFile, multerStorageConfig } from 'src/utils';

import { UpdateUserDto, updateUserSchema } from '../dto/updateUser.dto';
import { UsersService } from '../service/users.service';

@Controller('profile')
@UseFilters(MongooseExceptionFilter)
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Put()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage(multerStorageConfig),
    }),
  )
  async updateProfile(
    @Req() req,
    @UploadedFile() avatar: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const parsedSchema = updateUserSchema.safeParse({
      ...updateUserDto,
      avatar,
    });

    if (!parsedSchema.success) {
      await deleteFile(avatar.path);
      throw new BadRequestException();
    }

    return this.userService.updateUser(req.user.id, parsedSchema.data);
  }
}
