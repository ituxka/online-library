import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from './constants';
import { UserSafe } from '@online-library/api-interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {
  }

  async create(email: string, password: string) {
    const checkUser = await this.findOne(email);
    if (checkUser !== undefined) {
      throw new HttpException('email already exists', 400);
    }

    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  findOne(email: string) {
    return this.userRepository.findOne({ email });
  }

  convertToSafeUser(user: User): UserSafe {
    const { password: _, ...result } = user;
    return result;
  }
}