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
  async signUp(@Body() signUpUserDTO: SignUpUserDTO) {
    return this.authService.singUp(signUpUserDTO.email, signUpUserDTO.password);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signIn(@Request() req) {
    const user: UserSafe = req.user;
    return this.authService.signIn(user);
  }

  @Get('validate-token')
  @UseGuards(AuthGuard('jwt'))
  async validate(@Request() req) {
    const user: UserFromJWT = req.user;
    const userFromDB = await this.userService.findOne(user.email);
    return this.userService.convertToSafeUser(userFromDB);
  }
}
