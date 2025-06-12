// src/user/exceptions/user-already-exist.exception.ts

import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super('این کاربر قبلاً ثبت‌ نام کرده است . لطفاً وارد شوید.');
  }
}
