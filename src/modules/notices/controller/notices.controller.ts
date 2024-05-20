import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { IUserId } from 'src/types';
import { multerStorageConfig } from 'src/utils';

import { CreateNoticeDto, createNoticeSchema } from '../dto/createNotice.dto';
import { NoticesService } from '../service/notices.service';

@Controller('notices')
@UseFilters(MongooseExceptionFilter)
export class NoticesController {
  constructor(private noticesService: NoticesService) {}

  @Get()
  async getAllNotices(@Req() req: Partial<IUserId>) {
    return req?.user?.id;
  }

  @Get(':id')
  getNotice(@Param('id') id: string) {}

  @UseGuards(AuthGuard)
  @Post('favorites')
  async addToFavorites(@Req() req: IUserId) {}

  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavorites(@Req() req: IUserId) {}

  @UseGuards(AuthGuard)
  @Delete('favorites')
  async removeFromFavorites(@Req() req: IUserId) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage(multerStorageConfig),
    }),
  )
  async addNotice(
    @Req() req: IUserId,
    @UploadedFile() image: Express.Multer.File,
    @Body() createNoticeDto: CreateNoticeDto,
  ) {
    const parsedSchema = createNoticeSchema.safeParse({
      ...createNoticeDto,
      image,
    });
    console.log(parsedSchema.error.errors[0]);
    if (!parsedSchema.success)
      throw new BadRequestException(parsedSchema.error.errors[0].message);

    return await this.noticesService.addNotice(req.user.id, parsedSchema.data);
  }

  @UseGuards(AuthGuard)
  @Get('owner')
  async getOwnerNotices(@Req() req: IUserId) {}

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteNotice(@Param('id') id: string) {}
}
