import { Injectable } from '@angular/core';
import { AuthStore, createInitialState } from './auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResult, SignInPayload, SignUpPayload } from '@online-library/api-interfaces';
import { setLoading } from '@datorama/akita';

@Injectable()
export class AuthStoreService {
  private url = environment.apiUrl;

  private updateStore$ = pipe(
    tap((res: AuthResult) => this.authStore.update({
      token: res.token.access_token,
      user: res.user,
    })),
  );

  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
  ) {
  }

  signUp(email: string, password: string) {
    return this.http
      // TODO need better url building
      .post<AuthResult>(`${this.url}auth/signup`, { email, password } as SignUpPayload)
      .pipe(
        setLoading(this.authStore),
        this.updateStore$,
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResult>(`${this.url}auth/signin`, { email, password } as SignInPayload)
      .pipe(
        setLoading(this.authStore),
        this.updateStore$,
      );
  }

}
