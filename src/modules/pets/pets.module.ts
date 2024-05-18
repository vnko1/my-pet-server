import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CloudinaryService } from 'src/common';

import { Pet, PetSchema } from './schema/pets.schema';
import { PetsService } from './service/pets.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  providers: [CloudinaryService, PetsService],
})
export class PetsModule {}
