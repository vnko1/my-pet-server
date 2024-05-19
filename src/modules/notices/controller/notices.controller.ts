import { Controller, UseFilters } from '@nestjs/common';
import { MongooseExceptionFilter } from 'src/common';

@Controller('notices')
@UseFilters(MongooseExceptionFilter)
export class NoticesController {
  constructor() {}
}
