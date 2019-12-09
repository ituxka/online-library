import {
  Body,
  Controller, Get,
  Post, Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpUserDTO } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserFromJWT, UserSafe } from '@online-library/api-interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpUserDTO: SignUpUserDTO) {
    return this.userService.create(signUpUserDTO.email, signUpUserDTO.password);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signIn(@Request() req) {
    const user: UserSafe = req.user;
    return this.authService.signIn(user);
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protected(@Request() req) {
    const user: UserFromJWT = req.user;
    return user;
  }
}
