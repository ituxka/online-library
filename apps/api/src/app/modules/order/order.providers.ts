import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from '../../database/constants';
import { ORDER_REPOSITORY } from './order.constants';
import { Order } from './order.entity';

export const orderProviders: Provider[] = [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: [DATABASE_CONNECTION],
  },
];
