import { Component, Input } from '@angular/core';
import { IBook } from '@online-library/api-interfaces';

@Component({
  selector: 'ol-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  @Input() books: IBook[] = [];

  constructor() { }

}
