import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MyLogger } from 'src/services/logger/my-logger';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private logger: MyLogger) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    this.logger.debug(
      request.originalUrl,
      'InterCeptor - Request'
    );
    return next.handle().pipe(map(async (data) => {
      this.logger.APIlog(
        request.originalUrl,
        'InterCeptor - Response',
        request,
        response.statusCode,
      );
      return data;
    }))
  }
}
