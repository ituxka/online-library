import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { IBook, UserRole } from '@online-library/api-interfaces';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { BookingService } from '../../booking.service';
import { AuthQuery, AuthStoreService } from '../../../auth/state';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { GatewayService } from '../../gateway.service';

@Component({
  selector: 'ol-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent implements OnDestroy {
  roles = UserRole;

  updateBook$ = new BehaviorSubject(null);

  book$: Observable<IBook> = combineLatest(
    this.route.paramMap,
    this.updateBook$,
    this.gatewayService.onUpdateBook().pipe(startWith(null)),
  )
    .pipe(
      map(([paramMap]) => paramMap),
      map(paramMap => paramMap.get('id')),
      map(idAsString => parseInt(idAsString, 10)),
      filter(parsed => !isNaN(parsed)),
      switchMap(id => this.bookService.getById(id)),
      shareReplay(),
    );

  isAvailableToOrder$ = this.book$.pipe(
    map((book) => {
      const orderedBooks = this.authQuery.getOrderedBooks();
      return book.isAvailableToOrder && !this.bookService.isAlreadyOrdered(orderedBooks, book.id);
    }),
  );

  imagePlaceholder = 'https://via.placeholder.com/1000';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private bookingService: BookingService,
    private authQuery: AuthQuery,
    private authStoreService: AuthStoreService,
    private snackbarService: SnackbarService,
    private gatewayService: GatewayService,
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
        next: () => {
          this.updateBook$.next(null);
          this.snackbarService.openSuccess('Successfully ordered!');
        },
        error: ({ error }) => this.snackbarService.openError(error.message),
      });
  }

}
