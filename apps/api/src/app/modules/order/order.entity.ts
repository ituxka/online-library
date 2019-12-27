import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IOrder } from '@online-library/api-interfaces';
import { OrderStatus } from './order.status';
import { BaseModel } from '../base.entity';

@Entity()
export class Order extends BaseModel implements IOrder {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  bookId: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column()
  expiresAt: Date;
}
