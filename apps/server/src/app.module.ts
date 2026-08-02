import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HTTPExceptionFilter } from './common/http-exception.filter';

import { ResponseInterceptor } from './interceptors/response.interceptor';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>(
          'MONGO_DB_CONNECTION_STRING',
        );

        if (!mongoUri) {
          throw new Error('MONGO_DB_CONNECTION_STRING is missing in .env');
        }

        return {
          uri: mongoUri,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: HTTPExceptionFilter },
  ],
})
export class AppModule {}
