// src/user/exceptions/user-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(`شما ثبت نام نکرده اید ، لطفا ابتدا ثبت نام  کنید`);
  }
}
