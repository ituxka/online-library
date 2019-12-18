import { IUserSafe } from './user.interfaces';
import { JwtToken } from './jwt.interfaces';

export interface AuthResult {
  readonly user: IUserSafe;
  readonly token: JwtToken;
}

export interface SignUpPayload {
  readonly email: string;
  readonly password: string;
}

export interface SignInPayload {
  readonly email: string;
  readonly password: string;
}
