import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateOrder, IOrder } from '@online-library/api-interfaces';
import { environment } from '../../../environments/environment';
import { AuthQuery } from '../auth/state';

@Injectable()
export class BookingService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authQuery: AuthQuery,
  ) {
  }

  createOrder(userId: number, bookId: number): Observable<IOrder> {
    return this.http
      .post<IOrder>(`${this.url}order`, { userId, bookId } as ICreateOrder, {
        headers: {
          Authorization: `Bearer ${this.authQuery.getValue().token}`,
        },
      });
  }
}
