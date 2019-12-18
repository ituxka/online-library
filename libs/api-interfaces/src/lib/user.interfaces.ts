import { IBook } from './book.interfaces';

export enum UserRole {
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  password: string;
  role: UserRole;

  orderedBooks: IBook[];
}

export type IUserSafe = Omit<IUser, 'password'>;
