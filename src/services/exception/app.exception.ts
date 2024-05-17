import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const responseMessage = (
      type: string,
      message: string,
      status: HttpStatus,
    ) => {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      });
    };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.message.startsWith('E11000')) {
      responseMessage('Error', exception.message, 400);
    } else if (exception.message) {
      responseMessage('Error', exception.message, status);
    } else {
      responseMessage(exception.name, exception.message, status);
    }
  }
}
