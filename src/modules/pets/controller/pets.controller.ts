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
  Delete,
  Param,
  HttpCode,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard, MongooseExceptionFilter } from 'src/common';
import { diskStorage } from 'multer';

import { multerStorageConfig } from 'src/utils';

import { PetsService } from '../service/pets.service';
import { CreatePetDto, createPetSchema } from '../dto/createPet.dto';
import { isValidObjectId } from 'mongoose';

@Controller('pet')
@UseFilters(MongooseExceptionFilter)
export class PetsController {
  constructor(private petService: PetsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserPets(@Req() req) {
    return await this.petService.getPets(req.user.id);
  }

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

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deletePet(@Param('id') id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    await this.petService.deletePet(id);
  }
}
