import { USER_REPOSITORY } from './user.constants';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { DATABASE_CONNECTION } from '../../database/constants';
import { Provider } from '@nestjs/common';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
