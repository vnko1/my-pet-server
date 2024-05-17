import { Controller, Get } from '@nestjs/common';
import { SponsorsService } from '../service/sponsors.service';

@Controller('sponsors')
export class SponsorsController {
  constructor(private friendService: SponsorsService) {}

  @Get()
  getSponsors() {
    return this.friendService.getAll();
  }
}
