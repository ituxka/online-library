import { IsNumber } from 'class-validator';
import { ICreateOrder } from '@online-library/api-interfaces';

export class CreateOrderDto implements ICreateOrder {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly bookId: number;
}
