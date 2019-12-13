import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Book } from './book.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.constants';
import { Repository } from 'typeorm';

@Injectable()
export class BookService extends TypeOrmCrudService<Book>{
  constructor(
    @Inject(BOOK_REPOSITORY) protected bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }

  async updateAvailability(book: Book) {
    const isAvailable = book.copiesInUse + book.copiesBooked < book.copies;
    const bookFromDB = await this.bookRepository.findOne({ id: book.id });
    bookFromDB.isAvailableToBook = isAvailable;
    return this.bookRepository.save(bookFromDB);
  }
}
