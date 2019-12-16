import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAuthor } from '@online-library/api-interfaces';
import {
  BookFilterFn,
  containsAuthor,
  Filters,
  isAvailable,
  startWithTitle,
} from './book-filter.functions';

@Component({
  selector: 'ol-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css'],
})
export class BookFilterComponent {
  @Input() authors: IAuthor[] = [];
  @Output() newFilterEvent = new EventEmitter<BookFilterFn[]>();

  filters: Filters;

  constructor() {
    this.filters = this.initialFilters();
  }

  initialFilters() {
    return {
      title: {
        value: '',
        fn: startWithTitle,
      },
      authors: {
        value: [],
        fn: containsAuthor,
      },
      isAvailable: {
        value: false,
        fn: isAvailable,
      },
    };
  }

  onSubmit() {
    const filterFns: BookFilterFn[] = [];

    Object.values(this.filters).forEach((filter) => {
      filterFns.push(filter.fn(filter.value));
    });

    this.newFilterEvent.emit(filterFns);
  }

  onReset() {
    this.filters = this.initialFilters();
  }

}
