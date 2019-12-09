import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSafe } from '@online-library/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const { password: _, ...result } = user;
      return result as UserSafe;
    }

    return null;
  }

  async signIn(user: UserSafe) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
