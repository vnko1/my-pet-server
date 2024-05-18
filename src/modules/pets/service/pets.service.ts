import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiOptions } from 'cloudinary';
import { randomUUID } from 'crypto';

import { AppService, CloudinaryService } from 'src/common';

import { Pet } from '../schema/pets.schema';
import { CreatePetDto } from '../dto/createPet.dto';

@Injectable()
export class PetsService extends AppService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    private cloudinaryService: CloudinaryService,
  ) {
    super();
  }

  async createPet(userId: string, createPetDto: CreatePetDto) {
    const { image, ...petData } = createPetDto;
    const pet: any = { ...petData, owner: userId };

    if (image) {
      const res = await this.cloudinaryService.upload(
        image.path,
        this.getCloudinaryConfig(userId),
      );
      pet.imageUrl = res.eager[0].secure_url;
    }
    return this.petModel.create(pet);
  }

  async deletePet(id: string) {
    console.log(id);
  }

  private getCloudinaryConfig(id: string): UploadApiOptions {
    return {
      overwrite: false,
      resource_type: 'image',
      folder: `pets/pets/${id}`,
      public_id: randomUUID(),
      eager: 'f_auto',
    };
  }
}
