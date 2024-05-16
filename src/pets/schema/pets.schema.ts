import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PetsDocument = HydratedDocument<Pet>;

@Schema({ versionKey: false, timestamps: false })
export class Pet {}

export const PetSchema = SchemaFactory.createForClass(Pet);
