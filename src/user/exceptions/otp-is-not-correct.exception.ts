import { NotFoundException } from '@nestjs/common';

export class OtpIsNotCorrectException extends NotFoundException {
  constructor() {
    super(`.کد اعتبار سنجی اشتباه است`);
  }
}
