import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUser } from '@online-library/api-interfaces';
import { Observable } from 'rxjs';
import { AuthQuery } from '../auth/state';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authQuery: AuthQuery,
  ) { }

  findById(userId: IUser['id']): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.authQuery.getValue().token}`,
      },
    });
  }
}
