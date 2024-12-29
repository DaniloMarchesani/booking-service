import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(newBooking: CreateBookingDto) {
    return this.prismaService.booking.create({ data: newBooking });
  }

  findAll() {
    const userId = 1; // TODO: implement to get userid from token
    return this.prismaService.booking.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return this.prismaService.booking.findUnique({ where: { id } });
  }

  update(id: number, booking: UpdateBookingDto) {
    return this.prismaService.booking.update({
      where: { id },
      data: booking,
    });
  }

  remove(id: number) {
    return this.prismaService.booking.delete({ where: { id } });
  }

  removeAll() {
    const userid = 1; // TODO: implement to get userid from token
    return this.prismaService.booking.deleteMany({ where: { userId: userid } });
  }
}
