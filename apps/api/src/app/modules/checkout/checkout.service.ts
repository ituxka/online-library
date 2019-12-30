import { Injectable } from '@nestjs/common';
import { CronService } from '../utility/cron/cron.service';
import { Checkout, OrderStatus } from '@online-library/api-interfaces';
import { OrderService } from '../order/order.service';
import { DateTime } from 'luxon';

@Injectable()
export class CheckoutService {
  constructor(
    private orderService: OrderService,
    private cronService: CronService,
  ) {
  }

  async checkout({ userId, bookId }: Checkout) {
    await this.orderService.changeOrderStatus(userId, bookId, OrderStatus.CHECKED_OUT);
    this.cronService.schedule(this.checkoutExpiration(), () => {
      console.log('Send Email about expiration');
    });
  }

  private checkoutExpiration(): Date {
    return DateTime.local().plus({ minutes: 1 }).toJSDate();
  }
}
