import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { IBook, UserRole } from '@online-library/api-interfaces';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { BookingService } from '../../booking.service';
import { AuthQuery, AuthStoreService } from '../../../auth/state';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ol-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent implements OnDestroy {
  roles = UserRole;

  updateBook$ = new BehaviorSubject(null);

  book$: Observable<IBook> = combineLatest(this.route.paramMap, this.updateBook$)
    .pipe(
      map(([paramMap]) => paramMap),
      map(paramMap => paramMap.get('id')),
      map(idAsString => parseInt(idAsString, 10)),
      filter(parsed => !isNaN(parsed)),
      switchMap(id => this.bookService.getById(id)),
    );

  isAvailableToOrder$ = this.book$.pipe(
    map(book =>
      book.holders.find(holder => holder.id !== this.authQuery.userId()),
    ),
  );

  imagePlaceholder = 'https://via.placeholder.com/1000';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private bookingService: BookingService,
    private authQuery: AuthQuery,
    private authStoreService: AuthStoreService,
    private snackbarService: SnackbarService,
  ) {
  }

  // must be present for untilDestroy operator
  ngOnDestroy() {
  }

  onCreateOrder(bookId: number) {
    const userId = this.authQuery.userId();
    this.bookingService.createOrder(userId, bookId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          this.authStoreService.setUser(user);
          this.updateBook$.next(null);
          this.snackbarService.openSuccess('Successfully ordered!');
        },
        error: ({ error }) => this.snackbarService.openError(error.message),
      });
  }

}
