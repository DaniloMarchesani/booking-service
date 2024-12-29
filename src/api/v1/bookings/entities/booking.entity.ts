import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '@prisma/client';
import { UserEntity } from '../../user/entities/user.entity';

export class BookingEntity implements Booking {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description:
      'an optional description that client can request for the booking',
    maximum: 200,
    minimum: 10,
  })
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({
    description: 'id of the creator of that booking',
    required: false,
    nullable: true,
  })
  userId: number | null;

  @ApiProperty({
    description: 'user entity',
    required: false,
    nullable: true,
  })
  user?: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
