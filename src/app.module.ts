import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { RedisMiddleWare } from './redis/redis.middlware';
import { MyLogger } from './services/logger/my-logger';
import { ConfigModule } from '@nestjs/config';
import * as ormconfig from '../ormconfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from './interceptors/request.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule
  ],
  providers: [AppService, MyLogger, {provide: APP_INTERCEPTOR, useClass: RequestInterceptor}],
})
export class AppModule {
  constructor() { }
  configure(consumer: MiddlewareConsumer): void {// if you have a global prefix for apis you should put it in the exclude
    consumer.apply(RedisMiddleWare).exclude(
      {
        path: 'api/auth/login', method: RequestMethod.POST,
      }
    )
  }
}
