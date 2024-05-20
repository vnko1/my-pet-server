import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AppService, CloudinaryService } from 'src/common';

import { Notice, NoticeDocument } from '../schema/notices.schema';
import { CreateNoticeDto } from '../dto/createNotice.dto';

@Injectable()
export class NoticesService extends AppService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    private cloudinaryService: CloudinaryService,
  ) {
    super();
  }

  async addNotice(userId: string, createNoticeDto: CreateNoticeDto) {
    console.log(
      '🚀 ~ NoticesService ~ addNotice ~ createNoticeDto:',
      createNoticeDto,
    );
    console.log('🚀 ~ NoticesService ~ userId:', userId);
  }
}
