import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { AppService } from 'src/common';

@Catch(MongoError)
export class AuthExceptionFilter extends AppService implements ExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: MongoError, host: ArgumentsHost) {
    const responseMessage = this.response(host);

    switch (exception.code) {
      case 11000:
        responseMessage(exception.name, exception.message, 400);
    }
  }
}
