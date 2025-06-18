// src/user/interceptors/success-register.response.ts

import { SuccessResponse } from 'src/common/responses/success.response';

export class SuccessRegister<T = any> extends SuccessResponse<T> {
  constructor(data?: T) {
    super('کاربر با موفقیت ثبت نام شد.', data);
  }
}
