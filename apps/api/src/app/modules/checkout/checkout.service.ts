import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CronService } from '../utility/cron/cron.service';
import { Checkout, OrderStatus } from '@online-library/api-interfaces';
import { OrderService } from '../order/order.service';
import { DateTime } from 'luxon';
import { MailerService } from '../utility/mailer/mailer.service';
import { StatusException } from '../order/exceptions/status.exception';

@Injectable()
export class CheckoutService {
  constructor(
    private orderService: OrderService,
    private cronService: CronService,
    private mailerService: MailerService,
  ) {
  }

  async checkout({ userId, bookId }: Checkout) {
    try {
      await this.orderService.changeOrderStatus(userId, bookId, OrderStatus.CHECKED_OUT);
      this.cronService.schedule(this.checkoutExpiration(), () => {
        this.mailerService.sendMail();
      });
    } catch (e) {
      if (e instanceof StatusException) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private checkoutExpiration(): Date {
    return DateTime.local().plus({ minutes: 1 }).toJSDate();
  }
}
