import {
  Controller,
  Post,
  UseFilters,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { diskStorage } from 'multer';

import { multerStorageConfig } from 'src/utils';

import { PetsService } from '../service/pets.service';
import { CreatePetDto, createPetSchema } from '../dto/createPet.dto';

@Controller('pet')
@UseFilters(MongooseExceptionFilter)
export class PetsController {
  constructor(private petService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage(multerStorageConfig),
    }),
  )
  async createPet(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createPetDto: CreatePetDto,
  ) {
    const parsedSchema = createPetSchema.safeParse({
      ...createPetDto,
      image,
    });

    if (!parsedSchema.success)
      throw new BadRequestException(parsedSchema.error.errors[0].message);

    return await this.petService.createPet(req.user.id, parsedSchema.data);
  }
}
