import { Component } from '@angular/core';
import { BookService } from '../../book.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { IAuthor, IBook } from '@online-library/api-interfaces';
import { map } from 'rxjs/operators';
import { BookFilterFn } from './book-filter/book-filter.functions';

@Component({
  selector: 'ol-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.css'],
})
export class BookLibraryComponent {
  booksWithFilter$: Observable<IBook[]>;
  filter$ = new BehaviorSubject<BookFilterFn[]>([]);
  authors$: Observable<IAuthor[]>;

  constructor(
    private bookService: BookService,
  ) {
    this.booksWithFilter$ = combineLatest(
      this.bookService.getAll(),
      this.filter$,
    ).pipe(
      map(([books, filterFns]) => this.bookService.filter(books, filterFns)),
    );

    this.authors$ = this.bookService.getAllAuthors();
  }

  onFilter(bookFilterFns: BookFilterFn[]) {
    this.filter$.next(bookFilterFns);
  }
}
