import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CronService } from '../utility/cron/cron.service';
import { OrderService } from '../order/order.service';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    OrderModule,
    UserModule,
    BookModule,
  ],
  providers: [
    CheckoutService,
    OrderService,
    CronService,
  ],
  controllers: [
    CheckoutController,
  ],
})
export class CheckoutModule {
}
