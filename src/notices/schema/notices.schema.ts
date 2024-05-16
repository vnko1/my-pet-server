import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema({ versionKey: false, timestamps: false })
export class Notice {}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
