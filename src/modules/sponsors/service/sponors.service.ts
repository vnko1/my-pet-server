import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AppService } from 'src/services';
import { Sponsor } from '../schema/sponsor.schema';

@Injectable()
export class SponsorsService extends AppService {
  constructor(@InjectModel(Sponsor.name) private sponsorModel: Model<Sponsor>) {
    super();
  }

  getAll() {
    return this.sponsorModel.find().exec();
  }
}
