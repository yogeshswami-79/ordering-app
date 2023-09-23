import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }

  // @EventPattern('order_created')
  // async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
  //   this.billingService.bill(data);
  //   this.rmqService.ack(context);
  // }

  // @EventPattern('order_created')
  // async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
  //   this.billingService.bill(data);
  //   this.rmqService.ack(context);
  // }
}
