import { Module } from '@nestjs/common';
import { bookProviders } from './book.providers';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from '../../database/database.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookingService } from '../booking/booking.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...bookProviders,
    ...userProviders,
    BookService,
    UserService,
    BookingService,
  ],
  controllers: [BookController],
})
export class BookModule {
}
