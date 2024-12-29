import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @MaxLength(100)
  @MinLength(8)
  description?: string;

  @IsNotEmpty()
  date: Date;

  @IsNumber()
  userId?: number;
}
