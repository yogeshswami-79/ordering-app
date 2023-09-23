import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/orders.schema';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CancelOrderRequest } from './dto/cancel-order.request';
import { STATUS } from './constants/values';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepo: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const session = await this.ordersRepo.startTransaction();
    try {
      const data = { ...request, status: STATUS.PLACED };
      const order = await this.ordersRepo.create(data, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', { request }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async cancelOrder(request: CancelOrderRequest): Promise<boolean> {
    try {
      const order = await this.ordersRepo.findOne({ _id: request.id });

      if (order.status === STATUS.DELIVERED) {
        const msg = 'Order already delivered! cannot be canceled';
        throw new ConflictException(msg);
      }

      const status = await this.ordersRepo.findOneAndUpdate(
        { _id: request.id },
        { status: STATUS.CANCELLED },
      );

      await lastValueFrom(
        this.billingClient.emit('order_cancelled', { request }),
      );

      return !!status;
    } catch (error) {
      throw error.message;
    }
  }

  async getAll() {
    return await this.ordersRepo.find({});
  }
}
