import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';
import { BookingsService } from '../services/bookings.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookingEntity } from '../entities/booking.entity';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new booking for the user',
    type: CreateBookingDto,
  })
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Res() response: Response,
  ) {
    await this.bookingsService.create(createBookingDto);
    return response
      .status(HttpStatus.CREATED)
      .json({ statusCode: 201, message: 'Booking registered successfully' });
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all bookings of the logged in user',
    type: BookingEntity,
    isArray: true,
  })
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get a specific booking of the logged in user',
    type: BookingEntity,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const booking = await this.bookingsService.findOne(id);
    return response.status(HttpStatus.OK).json(booking);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a specific booking of the logged in user',
    type: BookingEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
    @Res() response: Response,
  ) {
    await this.bookingsService.update(id, updateBookingDto);
    return response.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete one specific bokking',
    type: BookingEntity,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    await this.bookingsService.remove(id);
    return response.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete()
  @ApiOkResponse({
    description:
      'Removes ALL listed bookings of the logged in user without mercy',
    type: BookingEntity,
  })
  async removeAll(@Res() response: Response) {
    await this.bookingsService.removeAll();
    return response.status(HttpStatus.NO_CONTENT).end();
  }
}
