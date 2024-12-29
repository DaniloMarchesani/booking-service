import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './api/v1/user/user.module';
import { BookingsModule } from './api/v1/bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    BookingsModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
