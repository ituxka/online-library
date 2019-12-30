import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { IOrder, UserRole } from '@online-library/api-interfaces';
import { RolesGuard } from '../auth/guards/roles.guard';

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

  @Get('book/:bookId')
  @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))
  getBookOrders(@Param('bookId') bookId: string): Promise<IOrder[]> {
    const id = parseInt(bookId, 10);
    if (isNaN(id)) {
      throw new HttpException(`invalid id: ${id}`, HttpStatus.BAD_REQUEST);
    }

    return this.orderService.getBookOrders(id);
  }
}
