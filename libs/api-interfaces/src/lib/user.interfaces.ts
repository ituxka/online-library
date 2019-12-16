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
}

export type UserSafe = Omit<IUser, 'password'>;
