import { IsEmail, IsString } from 'class-validator';

export class SignUpUserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class SignInUserDTO extends SignUpUserDTO {
}
