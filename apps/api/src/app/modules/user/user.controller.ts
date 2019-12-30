import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, UserRole } from '@online-library/api-interfaces';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))
  findById(@Param('id') userId: IUser['id']): Promise<IUser> {
    return this.userService.findById(userId);
  }
}
