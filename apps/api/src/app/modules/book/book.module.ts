import { Module } from '@nestjs/common';
import { bookProviders } from './book.providers';
import { DatabaseModule } from '../../database/database.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...bookProviders,
    BookService,
  ],
  controllers: [BookController],
})
export class BookModule {
}
