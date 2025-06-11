// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/email-verification.dto';

@Controller('/user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('checkExistsEmail')
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkExists(@Body() body: CheckEmailDto) {
    const exists = await this.authService.checkUserExistsOrThrow(body.email);
    return { exists };
  }
}
