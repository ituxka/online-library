import { IsString, Matches } from 'class-validator';
import { SignUpPayload } from '@online-library/api-interfaces';

export class SignUpUserDTO implements SignUpPayload {
  @Matches(/.+@.+/, { message: 'invalid email' })
  readonly email: string;

  @IsString()
  readonly password: string;
}
