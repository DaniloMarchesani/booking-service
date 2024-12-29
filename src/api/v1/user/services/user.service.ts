import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from '../dto';
import { UpdateUserDto } from '../dto';
import { IUserService } from '../interfaces/user.interface';
import * as bycrypt from 'bcrypt';

export const hashingRounds = 10;

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany({ include: { bookings: true } });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id: id } });
  }

  async create(user: CreateUserDto) {
    const hashedPassword = await bycrypt.hash(user.password, hashingRounds);
    user.password = hashedPassword;
    return this.prismaService.user.create({ data: user });
  }

  async update(id: number, user: UpdateUserDto) {
    if (user.password) {
      user.password = await bycrypt.hash(user.password, hashingRounds);
    }
    return this.prismaService.user.update({ where: { id }, data: user });
  }

  async delete(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
