import { HttpException, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user.service';
import { environment } from '../../../../environments/environment';
import { UserRole } from '@online-library/api-interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
  ) {
  }

  async onApplicationBootstrap() {
    try {
      await this.createModerator();
    } catch (e) {
      if (e instanceof HttpException) {
        console.log(e.message);
        return;
      }

      console.log(e);
    }
  }

  async createModerator() {
    const { email, password } = environment.moderator;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create(email, hashedPassword, UserRole.MODERATOR);
  }
}
