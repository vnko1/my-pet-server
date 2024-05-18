import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

import { AppService } from '../app/app.service';

interface DeleteOptions {
  sliceValue?: number;
  resource_type?: string;
  type?: string;
  notification_url: string;
  invalidate?: boolean;
}

@Injectable()
export class CloudinaryService extends AppService {
  private cloudinary = cloudinary;
  constructor() {
    super();

    this.cloudinary.config({
      cloud_name: process.env.C_CLOUD_NAME,
      api_key: process.env.C_API_KEY,
      api_secret: process.env.C_API_SECRET,
      secure: true,
    });
  }

  private getPublicIdFromUrl(url: string, sliceValue: number = -4) {
    return url.split('/').slice(sliceValue).join('/').split('.')[0];
  }

  async upload(filePath: string, options?: Partial<UploadApiOptions>) {
    try {
      return await this.cloudinary.uploader.upload(filePath, options);
    } catch (error) {
      console.log('🚀 ~ CloudinaryService ~ upload ~ error:', error);
      // throw new BadRequestException(error.message);
    } finally {
      fs.unlink(filePath);
    }
  }

  async delete(url: string, options?: Partial<DeleteOptions>) {
    try {
      const publicId = this.getPublicIdFromUrl(url, options?.sliceValue);

      await this.cloudinary.uploader.destroy(publicId, options);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
