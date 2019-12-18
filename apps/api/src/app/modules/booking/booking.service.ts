import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from '../book/book.constants';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { Book } from '../book/book.entity';
import { USER_REPOSITORY } from '../user/user.constants';
import { User } from '../user/user.entity';
import { IBook, IUser, IUserSafe } from '@online-library/api-interfaces';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOK_REPOSITORY) private bookRepository: Repository<Book>,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private userService: UserService,
  ) {
  }

  async createOrder(userId: number, bookId: number): Promise<IUserSafe> {
    const user = await this.userRepository.findOne({ id: userId }, { relations: ['bookedBooks'] });
    const book = await this.bookRepository.findOne({ id: bookId });

    if (!this.isAvailableToOrder(book)) {
      throw new HttpException('Could not order a book', HttpStatus.BAD_REQUEST);
    }

    if (this.isOrderAlreadyExists(user, book)) {
      throw new HttpException('Book already ordered', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.updateRelations(user, book);
    return this.userService.convertToSafeUser(updatedUser);
  }

  private isOrderAlreadyExists(user: IUserSafe, book: IBook): boolean {
    return user.orderedBooks.find(userBook => userBook.id === book.id) != null;
  }

  private async updateRelations(user: IUser, book: IBook): Promise<IUser> {
    let updatedUser: IUser = null;
    try {
      await getConnection().transaction(async (transactionEntityManager) => {
        const updatedBook = await this.updateBookCopiesStatus(book, transactionEntityManager);
        updatedUser = await this.updateUserBooksStatus(user, updatedBook, transactionEntityManager);
      });
    } catch (e) {
      throw new HttpException('Could not order a book', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return updatedUser;
  }

  private async updateUserBooksStatus(
    user: IUser,
    updatedBook: IBook,
    transactionEntityManager: EntityManager,
  ): Promise<IUser> {
    user.orderedBooks.push(updatedBook);
    const updatedUser = await transactionEntityManager.save(user);
    return updatedUser;
  }

  private async updateBookCopiesStatus(
    book: IBook, transactionEntityManager: EntityManager,
  ): Promise<IBook> {
    book.copiesOrdered += 1;
    book.isAvailableToOrder = this.isAvailableToOrder(book);
    const updatedBook = await transactionEntityManager.save(book);
    return updatedBook;
  }

  isAvailableToOrder(book: IBook): boolean {
    return book.copiesOrdered + book.copiesInUse < book.copies;
  }
}
