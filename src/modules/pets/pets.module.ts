import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Pet, PetSchema } from './schema/pets.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
})
export class PetsModule {}
