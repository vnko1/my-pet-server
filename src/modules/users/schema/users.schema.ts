import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { cityRegex, defaultAvatarUrl, emailRegex, phoneRegex } from 'src/utils';
import { Notice } from 'src/modules/notices/schema/notices.schema';
import { Pet } from 'src/modules/pets/schema/pets.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: false })
export class User {
  @Prop({ required: true, unique: true, match: emailRegex })
  email: string;

  @Prop({ required: true, default: '' })
  password: string;

  @Prop({ required: true, minlength: 2, maxlength: 15 })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Pet.name }])
  pets: [Pet];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Notice' }])
  favorites: Notice[];

  @Prop({ min: new Date('1940-01-01'), max: new Date() })
  birthday: Date;

  @Prop({ minlength: 13, match: phoneRegex })
  phone: string;

  @Prop({ minlength: 2, maxlength: 30, match: cityRegex })
  city: string;

  @Prop({ default: defaultAvatarUrl })
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
