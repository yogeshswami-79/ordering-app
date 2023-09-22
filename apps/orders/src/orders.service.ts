import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepo: OrdersRepository) {}

  async createOrderRequest(request: CreateOrderRequest): Promise<Order> {
    return await this.ordersRepo.create(request);
  }

  async getAll() {
    return await this.ordersRepo.find({});
  }
}
