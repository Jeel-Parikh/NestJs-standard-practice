import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

export function Serializer(schema: any) {
  return UseInterceptors(new SerializeInterceptor(schema));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private schema: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // this will run before handler

    return next.handle().pipe(
      map((resData: any) => {
        // this will run after handler
        const res: Response = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const message = resData.message;
        let data = plainToInstance(this.schema, resData.data, {
          exposeUnsetFields: true,
        });
        if (!Array.isArray(data)) {
          data = [data];
        }
        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}