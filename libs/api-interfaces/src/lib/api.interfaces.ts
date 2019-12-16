import { UserSafe } from './user.interfaces';
import { JwtToken } from './jwt.interfaces';

export interface AuthResult {
  readonly user: UserSafe;
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
