import { UserSafe } from './user-interfaces';
import { JwtToken } from './jwt-interfaces';

export interface AuthResult {
  readonly user: UserSafe;
  readonly token: JwtToken;
}
