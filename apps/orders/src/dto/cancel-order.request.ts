import { IsNotEmpty, IsString } from 'class-validator';

export class CancelOrderRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}
