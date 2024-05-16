import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { DB } from 'src/services/db.service';
import { Sponsor } from '../schema/sponsor.schema';

@Injectable()
export class SponsorsService extends DB {
  constructor(@InjectModel(Sponsor.name) private sponsorModel: Model<Sponsor>) {
    super();
  }

  getAll() {
    return this.sponsorModel.find().exec();
  }
}
