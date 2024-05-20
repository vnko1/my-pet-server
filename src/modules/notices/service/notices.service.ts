import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

import { AppService, CloudinaryService } from 'src/common';

import { Notice, NoticeDocument } from '../schema/notices.schema';
import { CreateNoticeDto } from '../dto/createNotice.dto';
import { UploadApiOptions } from 'cloudinary';

@Injectable()
export class NoticesService extends AppService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    private cloudinaryService: CloudinaryService,
  ) {
    super();
  }

  private getCloudinaryConfig(id: string): UploadApiOptions {
    return {
      overwrite: false,
      resource_type: 'image',
      folder: `pets/notices/${id}`,
      public_id: randomUUID(),
      eager: 'f_auto',
    };
  }

  async addNotice(userId: string, createNoticeDto: CreateNoticeDto) {
    const { file, ...noticeData } = createNoticeDto;

    const notice: any = { ...noticeData, owner: userId };

    if (file) {
      const res = await this.cloudinaryService.upload(
        file.path,
        this.getCloudinaryConfig(userId),
      );

      notice.imageUrl = res.eager[0].secure_url;
    }
    return this.noticeModel.create(notice);
  }
}
