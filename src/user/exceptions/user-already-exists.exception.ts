import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('این کاربر قبلاً ثبت‌ نام کرده است. لطفاً وارد شوید.');
  }
}
