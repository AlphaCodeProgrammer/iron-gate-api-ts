// src/user/auth/dto/verify-register-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class VerifyRegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  otp: string;
}
