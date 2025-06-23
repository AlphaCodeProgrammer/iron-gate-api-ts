// src/user/exceptions/wrong-password-exception.ts
import { UnauthorizedException  } from '@nestjs/common';

export class WrongPasswordException extends UnauthorizedException  {
  constructor() {
    super(`رمز عبور اشتباه است`);
  }
}
