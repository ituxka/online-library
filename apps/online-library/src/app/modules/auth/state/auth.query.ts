import { Query, toBoolean } from '@datorama/akita';
import { AuthState, AuthStore } from './auth.store';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthQuery extends Query<AuthState>{
  isSignedIn$ = this.select(store => toBoolean(store.token));

  constructor(
    protected store: AuthStore,
  ) {
    super(store);
  }

  isSignedIn(): boolean {
    return toBoolean(this.getValue().token);
  }
}