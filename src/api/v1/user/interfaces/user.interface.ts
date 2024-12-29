import { CreateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserService {
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity>;
  create(createUserDto: CreateUserDto): void;
  update(id: number, updateUserDto: Partial<CreateUserDto>): void;
  delete(id: number): void;
}
