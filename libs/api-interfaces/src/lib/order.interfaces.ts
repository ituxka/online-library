import { IUser } from './user.interfaces';
import { IBook } from './book.interfaces';

export interface IOrder {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userId: IUser['id'];
  bookId: IBook['id'];
  expiresAt: Date;
}

export interface ICreateOrder {
  userId: IUser['id'];
  bookId: IBook['id'];
}
