import { IsString, Matches } from 'class-validator';

export class SignUpUserDTO {
  @Matches(/.+@.+/, { message: 'invalid email' })
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class SignInUserDTO extends SignUpUserDTO {
}
