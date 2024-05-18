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
import { randomUUID } from 'crypto';

import { AuthGuard, MongooseExceptionFilter } from 'src/common';

import { UpdateUserDto, updateUserSchema } from '../dto/updateUser.dto';
import { UsersService } from '../service/users.service';

const multerStorageOption = {
  destination: 'temps/',
  filename: (
    _: unknown,
    file: Express.Multer.File,
    cb: (r: null, s: string) => void,
  ) => {
    const { mimetype } = file;
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const ext = mimetype.split('/')[1];
    const id = randomUUID();
    const filename = `${randomName}_` + id + '.' + ext;

    cb(null, filename);
  },
};

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
      storage: diskStorage(multerStorageOption),
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

    await this.userService.updateUser('1', parsedSchema.data);

    return { avatar: avatar, updateUserDto };
  }
}
