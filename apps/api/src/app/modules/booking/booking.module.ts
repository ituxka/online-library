import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from '../user/user.providers';
import { bookProviders } from '../book/book.providers';
import { BookingController } from './booking.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...userProviders,
    ...bookProviders,
    BookingService,
    UserService,
  ],
  controllers: [
    BookingController,
  ],
})
export class BookingModule {
}
