import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole, IUserSafe } from '@online-library/api-interfaces';

export class RolesGuard implements CanActivate {
  constructor(
    private roles: UserRole[],
  ) {
  }

  canActivate(context: ExecutionContext) {
    if (this.roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as IUserSafe;
    if (!user) {
      return false;
    }

    const hasRole = () => this.roles.some(role => user.role === role);

    return user && user.role && hasRole();
  }
}
