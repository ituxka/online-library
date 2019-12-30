import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dtos/checkout.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@online-library/api-interfaces';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))
  checkout(@Body() checkoutDto: CheckoutDto) {
    return this.checkoutService.checkout(checkoutDto);
  }
}
