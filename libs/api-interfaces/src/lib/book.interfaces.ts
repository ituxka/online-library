import { IAuthor } from './author.interfaces';
import { IUser } from './user.interfaces';

export interface IBook {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  author: IAuthor;
  published: Date;
  isAvailableToOrder: boolean;
  coverImage: string;
  copies: number;
  copiesInUse: number;
  copiesOrdered: number;

  holders: IUser[];
}
