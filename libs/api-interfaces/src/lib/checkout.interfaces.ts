import { IUser } from './user.interfaces';
import { IBook } from './book.interfaces';

export interface Checkout {
  userId: IUser['id'];
  bookId: IBook['id'];
}
