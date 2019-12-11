import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user.service';
import { environment } from '../../../../environments/environment';
import { UserRole } from '@online-library/api-interfaces';
import * as bcrypt from 'bcrypt';

export const USER_SEEDER = 'USER_SEEDER';

@Injectable()
export class UserSeederService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
  ) {
  }

  onApplicationBootstrap() {
    this.createModerator()
      .catch(err => console.log(err));
  }

  async createModerator() {
    const { email, password } = environment.moderator;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create(email, hashedPassword, UserRole.MODERATOR);
  }
}
