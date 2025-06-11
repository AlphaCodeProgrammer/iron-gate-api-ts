import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(userId: string) {
    super(`کاربری با آیدی ${userId}پیدا نشد`);
  }
}
