import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
