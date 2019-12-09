import { USER_REPOSITORY } from './constants';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { DATABASE_CONNECTION } from '../../database/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
