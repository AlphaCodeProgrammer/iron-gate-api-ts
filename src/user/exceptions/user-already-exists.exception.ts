// src/user/exceptions/user-already-exists.exception.ts
import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('این کاربر قبلاً ثبت‌ نام کرده است. لطفاً وارد شوید.');
  }
}
