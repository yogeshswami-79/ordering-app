import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { STATUS } from '../constants/values';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsPhoneNumber()
  @MinLength(10)
  phone: string;

  @IsEnum(STATUS)
  @IsNotEmpty()
  status: {
    type: STATUS;
    enum: STATUS;
  };
}
