import { Component, Input } from '@angular/core';
import { IBook } from '@online-library/api-interfaces';

@Component({
  selector: 'ol-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  imagePlaceholder = 'https://via.placeholder.com/1000';

  @Input() books: IBook[] = [];

  constructor() { }

}
