import { Module } from '@nestjs/common';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsService } from './services/bookings.service';
import { PrismaModule } from 'src/prisma';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [PrismaModule],
})
export class BookingsModule {}
