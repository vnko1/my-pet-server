import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/users.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { AppService } from 'src/services';

@Injectable()
export class AuthService extends AppService {
  constructor(private usersService: UsersService) {
    super();
  }

  async signUp(payload: CreateUserDto) {
    const hashPass = await this.hashPassword(payload.password);
    return await this.usersService.createUser({
      ...payload,
      password: hashPass,
    });
  }
}
