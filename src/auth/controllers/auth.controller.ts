import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthLoginDto } from '../dto/login.dto';
import { AuthRegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse()
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse()
  async register(@Body() { email, username, password }: AuthRegisterDto) {
    return this.authService.register(email, username, password);
  }
}
