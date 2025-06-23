// src/user/interceptors/success-login-response.ts

import { SuccessResponse } from "src/common/responses/success.response";

export class SuccessLogin<T = any> extends SuccessResponse<T> {

    constructor(data?: T){
        super('ورود با موفقیت انجام شد ' , data)
    }
}