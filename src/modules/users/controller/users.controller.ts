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
import { multerStorageConfig } from 'src/utils';
import { IUserId } from 'src/types';

import { UpdateUserDto, updateUserSchema } from '../dto/updateUser.dto';
import { UsersService } from '../service/users.service';
import { User } from '../schema/users.schema';

@Controller('profile')
@UseFilters(MongooseExceptionFilter)
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Req() req: { user: User }) {
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
    @Req() req: IUserId,
    @UploadedFile() avatar: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const parsedSchema = updateUserSchema.safeParse({
      ...updateUserDto,
      avatar,
    });

    if (!parsedSchema.success)
      throw new BadRequestException(parsedSchema.error.errors[0].message);

    return this.userService.updateUser(req.user.id, parsedSchema.data);
  }
}
