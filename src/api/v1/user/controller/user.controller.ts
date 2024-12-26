import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entity/user.entity';
import { Response } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users',
    type: UserEntity,
    isArray: true,
  })
  async findAll(@Res() response: Response) {
    const users = await this.userService.findAll();
    return response.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User details',
    type: UserEntity,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return response.status(HttpStatus.OK).send(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'User created',
    type: UserEntity,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    await this.userService.create(createUserDto);
    return response.status(HttpStatus.CREATED).end();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'User updated',
    type: UserEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: Partial<CreateUserDto>,
    @Res() response: Response,
  ) {
    await this.userService.update(id, createUserDto);
    return response.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'User deleted',
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    await this.userService.delete(id);
    return response.status(HttpStatus.NO_CONTENT).end();
  }
}
