import { NotFoundException } from '@nestjs/common';

export class OtpAlreadySentException extends NotFoundException {
  constructor(ttl: number) {
    super(`کد اعتبار سنجی قبلا ارسال شده است. زمان باقی مانده: ${ttl} ثانیه`);
  }
}
