import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SponsorsService } from './service/sponors.service';
import { Sponsor, SponsorSchema } from './schema/sponsor.schema';
import { SponsorsController } from './controller/sponors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sponsor.name, schema: SponsorSchema }]),
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService],
})
export class SponsorsModule {}
