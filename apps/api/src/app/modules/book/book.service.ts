import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Book } from './book.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BOOK_REPOSITORY } from './book.constants';
import { Repository } from 'typeorm';
import { IBook } from '@online-library/api-interfaces';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class BookService extends TypeOrmCrudService<Book>{
  constructor(
    @Inject(BOOK_REPOSITORY) protected bookRepository: Repository<Book>,
    private bookingService: BookingService,
  ) {
    super(bookRepository);
  }

  async updateAvailability(book: IBook) {
    const isAvailable = this.bookingService.checkAvailability(book);
    const bookFromDB = await this.bookRepository.findOne({ id: book.id });
    bookFromDB.isAvailableToBook = isAvailable;
    return this.bookRepository.save(bookFromDB);
  }
}
