import { IUser } from './user.interfaces';
import { IBook } from './book.interfaces';

export enum OrderStatus {
  BOOKED = 'BOOKED',
  CHECKED_OUT = 'CHECKED_OUT',
}

export interface IOrder {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userId: IUser['id'];
  bookId: IBook['id'];

  status: OrderStatus;
  expiresAt: Date;
}

export interface ICreateOrder {
  userId: IUser['id'];
  bookId: IBook['id'];
}
