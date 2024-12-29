import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthLoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse()
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }
}
