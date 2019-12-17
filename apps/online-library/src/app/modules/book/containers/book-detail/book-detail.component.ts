import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { IBook } from '@online-library/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'ol-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  book$: Observable<IBook> = this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('id')),
      map(idAsString => parseInt(idAsString, 10)),
      filter(parsed => !isNaN(parsed)),
      switchMap(id => this.bookService.getById(id)),
    );

  imagePlaceholder = 'https://via.placeholder.com/1000';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

}
