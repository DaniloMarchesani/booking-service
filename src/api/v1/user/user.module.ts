import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './controller';
import { PrismaModule } from 'src/prisma';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule],
})
export class UserModule {}
