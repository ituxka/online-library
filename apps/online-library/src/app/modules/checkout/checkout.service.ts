import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Checkout } from '@online-library/api-interfaces';
import { AuthQuery } from '../auth/state';

@Injectable()
export class CheckoutService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authQuery: AuthQuery,
  ) {
  }

  checkout(checkoutDto: Checkout) {
    return this.http.post<void>(`${this.url}checkout`, checkoutDto, {
      headers: {
        Authorization: `Bearer ${this.authQuery.getValue().token}`,
      },
    });
  }
}
