import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResult, JwtPayload, IUserSafe } from '@online-library/api-interfaces';
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
      return this.userService.convertToSafeUser(user);
    }

    return null;
  }

  async singUp(email: string, password: string): Promise<AuthResult> {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.create(email, hashedPassword);
    const userSafe = this.userService.convertToSafeUser(user);

    return this.signIn(userSafe);
  }

  async signIn(user: IUserSafe): Promise<AuthResult> {
    const payload = { user } as JwtPayload;

    return {
      user,
      token: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
