import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { AuthEntity } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} doesn't exists`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id, email: user.email }),
    };
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthEntity> {
    try {
      const ifUserExists = await this.prismaService.user.findUnique({
        where: { email: email },
      });
      if (ifUserExists) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt
        .genSalt(10)
        .then((pw) => bcrypt.hash(password, pw));

      const user = await this.prismaService.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          email: user.email,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
    }
  }
}
