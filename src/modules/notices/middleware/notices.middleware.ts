import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AppService } from 'src/common';
import { UsersService } from 'src/modules/users/service/users.service';

@Injectable()
export class NoticesMiddleware extends AppService implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    super();
  }
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
