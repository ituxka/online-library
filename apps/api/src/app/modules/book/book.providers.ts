import { BOOK_REPOSITORY } from './book.constants';
import { Connection } from 'typeorm';
import { Book } from './book.entity';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/constants';

export const bookProviders: Provider[] = [
  {
    provide: BOOK_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Book),
    inject: [DATABASE_CONNECTION],
  },
];
