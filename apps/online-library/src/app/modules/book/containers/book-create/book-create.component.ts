import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../book.service';
import { IAuthor, IBook } from '@online-library/api-interfaces';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

@Component({
  selector: 'ol-book',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  authors$: Observable<IAuthor[]>;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private snackbarService: SnackbarService,
  ) {
    this.authors$ = this.bookService.getAllAuthors();
  }

  initForm() {
    this.bookForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      published: [null, [Validators.required]],
      isAvailableToBook: [false, []],
      copies: [0, []],
      copiesInUse: [0, []],
      copiesBooked: [0, []],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  // must be present for untilDestroy operator
  ngOnDestroy() {
  }

  onClear() {
    this.bookForm.reset();
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    const book = this.bookForm.value as Partial<IBook>;
    this.bookService.create(book)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.snackbarService.openSuccess('Successfully created');
          this.initForm();
        },
        error: ({ error }) => {
          this.snackbarService.openError(JSON.stringify(error.message));
        },
      });
  }
}
