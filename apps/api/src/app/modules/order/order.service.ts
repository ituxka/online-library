import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { ORDER_REPOSITORY } from './order.constants';
import { getConnection, Repository } from 'typeorm';
import { Order } from './order.entity';
import { IBook, ICreateOrder, IOrder, IUser } from '@online-library/api-interfaces';
import { OrderStatus } from './order.status';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: Repository<Order>,
    private userService: UserService,
    private bookService: BookService,
  ) {
  }

  async create(order: ICreateOrder): Promise<IOrder> {
    const user = await this.userService.findById(order.userId);
    const book = await this.bookService.findById(order.bookId);

    if (!this.bookService.isAvailableToOrder(book)) {
      throw new HttpException('Could not order a book', HttpStatus.BAD_REQUEST);
    }

    if (this.userService.isBookAlreadyOrdered(user.orderedBooks, book.id)) {
      throw new HttpException('Book already ordered', HttpStatus.BAD_REQUEST);
    }

    return this.createInTransaction(order, user, book);
  }

  private async createInTransaction(order: ICreateOrder, user: IUser, book: IBook) {
    let orderToReturn = null;
    await getConnection().transaction(async (entityManager) => {
      const createdOrder = await entityManager.save<Partial<Order>>('Order', {
        ...order,
        status: OrderStatus.BOOKED,
        expiresAt: this.expirationDate(),
      });

      const updatedBook = this.bookService.addHolderAndUpdateAvailability(book, user);
      user.orderedBooks = this.userService.addOrderedBook(user, updatedBook);

      await entityManager.save(updatedBook);
      await entityManager.save(user);

      orderToReturn = createdOrder;
    });

    return orderToReturn;
  }

  private expirationDate() {
    const now = new Date();
    return new Date(now.setDate(now.getDate() + 1)); // 1 day
  }
}
