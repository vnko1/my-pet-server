import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schema/users.schema';
import { CreateUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(newUser: CreateUserDto) {
    return this.userModel.create(newUser);
  }
}
