import { Injectable } from '@nestjs/common';
import { AppService } from 'src/common';

@Injectable()
export class NoticesService extends AppService {
  constructor() {
    super();
  }
}
