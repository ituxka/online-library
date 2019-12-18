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
import { UserRole, IUserSafe } from '@online-library/api-interfaces';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';

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
    const user: IUserSafe = req.user;
    return this.authService.signIn(user);
  }

  @Get('validate-token')
  @UseGuards(AuthGuard('jwt'))
  async validate(@Request() req) {
    const user: IUserSafe = req.user;
    const userFromDB = await this.userService.findOne(user.email);
    return this.userService.convertToSafeUser(userFromDB);
  }

  @Get('test-role')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))
  moderatorOnly(@Request() req) {
    console.log('Yay, im in');
  }
}
