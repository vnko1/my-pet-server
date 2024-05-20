import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async addToFavorite(noticeId: string, userId: string) {
    return this.noticeModel.findByIdAndUpdate(
      noticeId,
      {
        $addToSet: { favorites: userId },
      },
      { new: true },
    );
  }

  async removeFromFavorite(noticeId: string, userId: string) {
    return this.noticeModel.findByIdAndUpdate(
      noticeId,
      {
        $pull: { favorites: userId },
      },
      { new: true },
    );
  }

  async getFavorites(userId: string) {
    return this.noticeModel.find();
  }

  async getNotice(id: string) {
    const res = await this.noticeModel.findById(id);
    if (!res) throw new NotFoundException(`Notice with id: ${id} not exists`);
    return res;
  }

  async getOwnersNotices(owner: string) {
    return this.noticeModel.find({ owner });
  }

  async deleteNotice(id: string) {
    const res: Notice = await this.noticeModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Notice with id: ${id} not exists`);
    this.cloudinaryService.delete(res.imageUrl);
  }
}
