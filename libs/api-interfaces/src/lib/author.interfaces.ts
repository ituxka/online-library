import { IBook } from './book.interfaces';

export interface IAuthor {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  birthday: Date;
  books: IBook[];
}
