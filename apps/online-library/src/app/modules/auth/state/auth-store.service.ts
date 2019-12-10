import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResult } from '@online-library/api-interfaces';
import {
  SignInUserDTO,
  SignUpUserDTO,
} from '../../../../../../api/src/app/modules/user/dtos/create-user.dto';
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
      .post<AuthResult>(`${this.url}auth/signup`, { email, password } as SignUpUserDTO)
      .pipe(
        setLoading(this.authStore),
        this.updateStore$,
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResult>(`${this.url}auth/signin`, { email, password } as SignInUserDTO)
      .pipe(
        setLoading(this.authStore),
        this.updateStore$,
      );
  }

}