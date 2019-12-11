import { UserSafe } from '@online-library/api-interfaces';

export interface JwtToken {
  access_token: string;
}

export interface JwtPayload {
  user: UserSafe;
}
