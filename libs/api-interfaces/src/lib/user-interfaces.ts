export enum UserRole {
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
