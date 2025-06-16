// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/email-verification.dto';
import { SuccessSendOtp } from '../interceptors/success-send-otp.response';
import { VerifyRegisterUserDto } from './dto/verify-register-user.dto';
import { SuccessRegister } from '../interceptors/success-register.response';

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
}
