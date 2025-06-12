// src/common/interceptors/response.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { SuccessResponse } from '../responses/success.response'; // ✅ درست

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((responseData: any) => {
        const statusCode = res.statusCode;

        let message = 'عملیات با موفقیت انجام شد';
        let data = responseData;

        if (responseData instanceof SuccessResponse) {
          message = responseData.message;
          data = responseData.data ?? null;
        }

        return {
          statusCode,
          message,
          data,
          path: req.url,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
