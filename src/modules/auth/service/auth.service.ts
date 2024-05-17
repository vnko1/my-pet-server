import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/users.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { AppService } from 'src/common';

@Injectable()
export class AuthService extends AppService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async signUp(payload: CreateUserDto) {
    const hashPass = await this.hashPassword(payload.password);
    return await this.usersService.createUser({
      ...payload,
      password: hashPass,
    });
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findUser({ email });

    const isValidPass = await this.checkPassword(pass, user?.password || '');

    if (!isValidPass) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.name,
      useremail: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
