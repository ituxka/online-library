import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Book } from './book.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.constants';
import { Repository } from 'typeorm';
import { IBook, IUser } from '@online-library/api-interfaces';
import { Subject } from 'rxjs';

@Injectable()
export class BookService extends TypeOrmCrudService<Book>{
  private book = new Subject<IBook>();

  constructor(
    @Inject(BOOK_REPOSITORY) protected bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }

  get book$() {
    return this.book;
  }

  async findById(bookId: IBook['id']): Promise<IBook> {
    return this.bookRepository.findOne({ id: bookId }, { relations: ['holders'] });
  }

  updateAvailability(book: IBook): IBook {
    book.isAvailableToOrder = this.isAvailableToOrder(book);
    return book;
  }

  isAvailableToOrder(book: IBook): boolean {
    const { copiesOrdered, copiesInUse, copies } = this.normalizeIfEmpty(book);
    return copiesOrdered + copiesInUse < copies;
  }

  addHolderAndUpdateAvailability(book: IBook, holder: IUser): IBook {
    book.holders = this.addHolder(book, holder);
    book.copiesOrdered += 1;
    return this.updateAvailability(book);
  }

  removeHolderAndUpdateAvailability(book: IBook, holder: IUser): IBook {
    book.holders = this.removeHolder(book, holder);
    book.copiesOrdered -= 1;
    return this.updateAvailability(book);
  }

  private addHolder(book: IBook, holder: IUser): IBook['holders'] {
    return [...book.holders, holder];
  }

  private removeHolder(book: IBook, holder: IUser): IBook['holders'] {
    return book.holders.filter(h => h.id !== holder.id);
  }

  private normalizeIfEmpty(book: IBook): IBook {
    book.copiesOrdered = book.copiesOrdered || 0;
    book.copiesInUse = book.copiesInUse || 0;
    return book;
  }
}
