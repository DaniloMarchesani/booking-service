import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entity/user.entity';

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
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User details',
    type: UserEntity,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'User created',
    type: UserEntity,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'User updated',
    type: UserEntity,
  })
  update(
    @Param('id') id: string,
    @Body() createUserDto: Partial<CreateUserDto>,
  ) {
    return this.userService.update(+id, createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'User deleted',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
