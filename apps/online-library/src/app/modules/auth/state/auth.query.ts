import { Query, toBoolean } from '@datorama/akita';
import { AuthState, AuthStore } from './auth.store';
import { Injectable } from '@angular/core';
import { UserRole } from '@online-library/api-interfaces';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState>{
  isSignedIn$ = this.select(store => toBoolean(store.token));
  role$ = this.select(store => store.user && store.user.role);

  constructor(
    protected store: AuthStore,
  ) {
    super(store);
  }

  isSignedIn(): boolean {
    return toBoolean(this.getValue().token);
  }

  role(): UserRole | null {
    const { user } = this.getValue();
    return user && user.role;
  }

  userId(): number | null {
    const { user } = this.getValue();
    return user && user.id;
  }

}
