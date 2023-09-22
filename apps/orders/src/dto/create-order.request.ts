import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

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
}
