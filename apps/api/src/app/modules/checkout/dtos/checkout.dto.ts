import { Checkout } from '@online-library/api-interfaces';
import { IsNumber } from 'class-validator';

export class CheckoutDto implements Checkout {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;
}
