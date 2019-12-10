import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignUpResult } from '@online-library/api-interfaces';

@Injectable()
export class AuthStoreService {
  private url = environment.apiUrl;

  private updateStore$ = pipe(
    tap((res: SignUpResult) => this.authStore.update({
      token: res.token.access_token,
      user: res.user,
    })),
  );

  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
  ) {
  }
}
