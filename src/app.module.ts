import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './api/v1/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
