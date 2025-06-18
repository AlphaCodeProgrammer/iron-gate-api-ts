//src/user/exceptions/otp-is-not-correct.exception.ts

import { NotFoundException } from '@nestjs/common';

export class OtpIsNotCorrectException extends NotFoundException {
  constructor() {
    super(`.کد اعتبار سنجی اشتباه است`);
  }
}
