import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthor, IBook } from '@online-library/api-interfaces';
import { BookFilterFn } from './containers/book-library/book-filter/book-filter.functions';

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

  getAll(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.url}book`);
  }

  getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.url}author`);
  }

  filter(books: IBook[], filterFns: BookFilterFn[]): IBook[] {
    if (filterFns.length === 0) {
      return books;
    }

    return books.filter(book => filterFns.every(fn => fn(book)));
  }
}
