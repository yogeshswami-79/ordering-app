import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS } from '../constants/values';
@Schema({})
export class Order extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phone: string;

  @Prop({ type: String, enum: STATUS })
  status: STATUS;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
