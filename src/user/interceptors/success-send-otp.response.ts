// src/user/responses/success-register.response.ts

import { SuccessResponse } from 'src/common/responses/success.response';

export class SuccessSendOtp<T = any> extends SuccessResponse<T> {
  constructor(data?: T) {
    super('کد اعتبارسنجی با موفقیت ارسال شد ،لطفا بخش spam  ایمیل خودر را برسی کنید .', data);
  }
}
