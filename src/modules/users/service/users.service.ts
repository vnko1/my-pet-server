import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiOptions } from 'cloudinary';

import { AppService, CloudinaryService } from 'src/common';
import { User } from '../schema/users.schema';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Injectable()
export class UsersService extends AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {
    super();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const { avatar, ...userData } = updateUserDto;
    const user: Partial<User> = { ...userData };
    if (avatar) {
      const avatarData = await this.saveAvatar(avatar.path, userId);
      user.avatarUrl = avatarData.eager[0].secure_url;
    }
    return user;
  }

  createUser(newUser: CreateUserDto) {
    return this.userModel.create(newUser);
  }

  findUser(query: { [key: string]: string }) {
    return this.userModel.findOne(query).exec();
  }

  findUserById(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  private getUploadOptions(id: string): UploadApiOptions {
    return {
      resource_type: 'image',
      folder: 'pets/avatar',
      public_id: id,
      eager: 'f_auto',
      overwrite: true,
    };
  }
  private async saveAvatar(filePath: string, userId: string) {
    return await this.cloudinaryService.upload(
      filePath,
      this.getUploadOptions(userId),
    );
  }
}
