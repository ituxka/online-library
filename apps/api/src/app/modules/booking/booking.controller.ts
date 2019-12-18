import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, bookId } = createOrderDto;
    return this.bookingService.createOrder(userId, bookId);
  }
}
