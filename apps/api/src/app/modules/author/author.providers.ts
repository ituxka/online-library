import { Provider } from '@nestjs/common';
import { AUTHOR_REPOSITORY } from './author.constant';
import { Connection } from 'typeorm';
import { Author } from './author.entity';
import { DATABASE_CONNECTION } from '../../database/constants';

export const authorProviders: Provider[] = [
  {
    provide: AUTHOR_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Author),
    inject: [DATABASE_CONNECTION],
  },
];
