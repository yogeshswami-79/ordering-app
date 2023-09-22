import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { Order } from './schemas/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: CreateOrderRequest): Promise<Order> {
    return await this.ordersService.createOrder(request);
  }

  @Get()
  async getAllOrders() {
    return await this.ordersService.getAll();
  }
}
