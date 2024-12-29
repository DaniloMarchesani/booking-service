import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from 'src/prisma';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtUtils } from './utils/jwt.utils';
import { UserModule } from 'src/api/v1/user/user.module';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h', algorithm: 'HS256' },
    }),
  ],
  providers: [AuthService, JwtUtils],
})
export class AuthModule {}
