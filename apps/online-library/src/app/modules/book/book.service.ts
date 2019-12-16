import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IBook } from '@online-library/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  create(book: Partial<IBook>): Observable<IBook> {
    return this.http.post<IBook>(`${this.url}book`, book);
  }
}
