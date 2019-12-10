import { UserSafe } from './user-interfaces';
import { JwtToken } from './jwt-interfaces';

export interface SignUpResult {
  readonly user: UserSafe;
  readonly token: JwtToken;
}
