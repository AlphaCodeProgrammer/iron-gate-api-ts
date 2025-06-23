// src/user/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/email-verification.dto';
import { SuccessSendOtp } from '../interceptors/success-send-otp.response';
import { VerifyRegisterUserDto } from './dto/verify-register-user.dto';
import { SuccessRegister } from '../interceptors/success-register.response';
import { VerifyLoginUserDto } from './dto/verify-login-user.dto';
import { SuccessLogin } from '../interceptors/success-login-response';

@Controller('/user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp-to-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkExistsUser(@Body() body: CheckEmailDto) {
    await this.authService.checkUserExistsOrThrow(body.email);
    return new SuccessSendOtp({ email: body.email });
  }

  @Post('verify-register-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyAndRegisterUser(@Body() body: VerifyRegisterUserDto) {
    await this.authService.RegisterUser(body.email, body.username, body.password, body.otp);
    return new SuccessRegister({ email: body.email });
  }

  @Post('login-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() body: VerifyLoginUserDto) {
  const token = await this.authService.loginUser(body.email, body.password);
    return new SuccessLogin(token);
  }
}
