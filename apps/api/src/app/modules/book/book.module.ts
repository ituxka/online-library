import { Module } from '@nestjs/common';
import { bookProviders } from './book.providers';
import { userProviders } from '../user/user.providers';
import { DatabaseModule } from '../../database/database.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UserService } from '../user/user.service';
import { BookGateway } from './gateway/book.gateway';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...bookProviders,
    ...userProviders,
    BookGateway,
    BookService,
    UserService,
  ],
  controllers: [BookController],
  exports: [
    BookService,
  ],
})
export class BookModule {
}
