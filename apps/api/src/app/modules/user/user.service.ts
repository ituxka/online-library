import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from './constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {
  }

  create(email: string, password: string) {
    // TODO encrypt password
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  findOne(email: string) {
    return this.userRepository.findOne({ email });
  }
}
