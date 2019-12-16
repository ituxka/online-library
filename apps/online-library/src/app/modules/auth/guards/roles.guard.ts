import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthQuery } from '../state';
import { UserRole } from '@online-library/api-interfaces';

@Injectable({ providedIn:'root' })
export class RolesGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const roles = route.data.roles as UserRole[];
    return roles.includes(this.authQuery.role());
  }
}
