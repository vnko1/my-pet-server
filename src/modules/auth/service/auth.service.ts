import { Injectable } from '@nestjs/common';
import { AppService } from 'src/services';

@Injectable()
export class AuthService extends AppService {
  constructor() {
    super();
  }
}
