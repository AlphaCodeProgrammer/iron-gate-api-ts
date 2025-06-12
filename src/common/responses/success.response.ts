// src/common/responses/success.response.ts

export class SuccessResponse<T = any> {
    constructor(
      public readonly message: string,
      public readonly data?: T,
    ) {}
  }
  