import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserSafe } from '@online-library/api-interfaces';

export interface AuthState {
  token: string | null;
  user: UserSafe | null;
}

export const createInitialState = (): AuthState => ({
  token: null,
  user: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
