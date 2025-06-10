
// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestVerificationDto } from './dto/email-verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-code')
  requestCode(@Body() dto: RequestVerificationDto) {
    return this.authService.requestVerificationCode(dto);
  }
}
