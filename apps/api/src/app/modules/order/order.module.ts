import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { CronService } from '../utility/cron/cron.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BookModule,
  ],
  providers: [
    ...orderProviders,
    OrderService,
    CronService,
  ],
  controllers: [
    OrderController,
  ],
})
export class OrderModule {
}
