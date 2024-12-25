import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from '../dto';
import { UpdateUserDto } from '../dto';
import { IUserService } from '../interfaces/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({ include: { bookings: true } });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  create(user: CreateUserDto) {
    return this.prismaService.user.create({ data: user });
  }

  update(id: number, user: UpdateUserDto) {
    return this.prismaService.user.update({ where: { id }, data: user });
  }

  delete(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
