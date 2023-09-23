import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { Order } from './schemas/orders.schema';
import { CancelOrderRequest } from './dto/cancel-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest): Promise<Order> {
    return await this.ordersService.createOrder(request);
  }

  @Patch('cancel')
  async cancelOrder(@Body() request: CancelOrderRequest): Promise<boolean> {
    return await this.ordersService.cancelOrder(request);
  }

  @Get()
  async getAllOrders() {
    return await this.ordersService.getAll();
  }
}
