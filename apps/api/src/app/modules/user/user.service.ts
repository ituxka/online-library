import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY } from './user.constants';
import { UserRole, IUserSafe, IUser, IBook } from '@online-library/api-interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {
  }

  async create(email: string, password: string, role: UserRole = UserRole.USER) {
    const checkUser = await this.findOne(email);
    if (checkUser != null) {
      throw new HttpException('email already exists', 400);
    }

    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  isBookAlreadyOrdered(orderedBooks: IBook[], bookId: IBook['id']): boolean {
    return orderedBooks.find(userBook => userBook.id === bookId) != null;
  }

  addOrderedBook(user: IUser, book: IBook): IUser['orderedBooks'] {
    return [...user.orderedBooks, book];
  }

  removeOrderedBook(user: IUser, book: IBook): IUser['orderedBooks'] {
    return user.orderedBooks.filter(orderedBook => orderedBook.id !== book.id);
  }

  findById(userId: IUser['id']): Promise<IUser> {
    return this.userRepository.findOne({ id: userId }, { relations: ['orderedBooks'] });
  }

  findOne(email: string) {
    return this.userRepository.findOne({ email });
  }

  convertToSafeUser(user: IUser): IUserSafe {
    const { password: _, ...result } = user;
    return result;
  }
}
