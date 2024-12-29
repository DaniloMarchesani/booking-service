import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of users',
    type: UserEntity,
    isArray: true,
  })
  async findAll() {
    const users = await this.userService.findAll();
    // Convert all user returned from Db from type User tp UserEntity
    const mappedUserEntities: UserEntity[] = users.map(
      (user) => new UserEntity(user),
    );
    return mappedUserEntities;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User details',
    type: UserEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = new UserEntity(await this.userService.findOne(id));
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'User created',
    type: UserEntity,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return;
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
  ) {
    await this.userService.update(id, createUserDto);
    return;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'User deleted',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
    return;
  }
}
