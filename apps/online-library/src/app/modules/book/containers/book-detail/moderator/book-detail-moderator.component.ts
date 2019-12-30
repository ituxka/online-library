import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookService } from '../../../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from '../../../../user/user.service';
import { IOrder, IUser } from '@online-library/api-interfaces';
import { CheckoutService } from '../../../../checkout/checkout.service';

type UserWithOrderExpirationAndStatus = IUser & Pick<IOrder, 'status' | 'expiresAt'>;

@Component({
  selector: 'ol-book-detail-moderator',
  templateUrl: './book-detail-moderator.component.html',
  styleUrls: ['./book-detail-moderator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailModeratorComponent implements OnInit {
  holders$: Observable<UserWithOrderExpirationAndStatus[]>;
  bookId: number;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  private addExpiration = switchMap((orders: IOrder[]) =>
    forkJoin(orders.map(order => this.userService.findById(order.userId)
      .pipe(map(user => ({ ...user, expiresAt: order.expiresAt, status: order.status }))),
    )));

  ngOnInit() {
    const id = this.route.snapshot.parent.paramMap.get('id');
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      this.router.navigate(['../'], { relativeTo: this.route }).then();
    }

    this.bookId = parsedId;

    this.holders$ = this.bookService.getOrders(parsedId)
      .pipe(this.addExpiration);
  }

  onCheckout(user: UserWithOrderExpirationAndStatus) {
    this.checkoutService.checkout({ userId: user.id, bookId: this.bookId })
      .subscribe({
        next: () => console.log('+'),
        error: () => console.log('-'),
      });
  }
}
