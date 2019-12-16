import { IAuthor } from './author.interfaces';

export interface IBook {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  author: IAuthor;
  published: Date;
  isAvailableToBook: boolean;
  coverImage: string;
  copies: number;
  copiesInUse: number;
  copiesBooked: number;
}
