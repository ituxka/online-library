import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './constants';
import { User } from '../modules/user/user.entity';
import { environment } from '../../environments/environment';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: environment.dbUser,
      password: environment.dbPassword,
      database: 'online-library',
      entities: [
        User,
      ],
      synchronize: true,
    }),
  },
];