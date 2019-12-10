import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthQuery } from './state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
    private router: Router,
  ) {
  }

  canActivate(_, state: RouterStateSnapshot) {
    const signedIn = this.authQuery.isSignedIn();
    const authPath = state.url.startsWith('/auth');

    switch (true) {
      case authPath && signedIn:
        this.router.navigate(['/']).then();
        return false;
      case authPath && !signedIn: return true;
      case !authPath && signedIn: return true;
      case !authPath && !signedIn:
        this.router.navigate(['auth']).then();
        return false;
    }
  }
}
