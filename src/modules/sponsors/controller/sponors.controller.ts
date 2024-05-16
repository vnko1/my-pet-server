import { Controller, Get } from '@nestjs/common';
import { SponsorsService } from '../service/sponors.service';

@Controller('sponsors')
export class SponsorsController {
  constructor(private friendService: SponsorsService) {}

  @Get()
  getSponsors() {
    return this.friendService.getAll();
  }
}
