import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule, ConfigService} from 'nestjs-config';
import {resolve} from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotoModule} from './modules/photo/Photo.module';
import {AppService} from './app.service';
import {AuthModule} from './modules/auth/auth.module';
import {CommonModule} from './common.module';

import {APP_INTERCEPTOR, APP_FILTER, APP_GUARD} from '@nestjs/core';
import {AllExceptionFilter} from "./exception/all-exception.filter";
import {ResponseInterceptor} from "./interceptor/response.interceptor";
import {JwtGuard} from "./modules/guard/jwt.guard";

@Module({
    imports: [
        ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        PhotoModule,
        AuthModule,
        CommonModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: JwtGuard, // 全局jwt token验证
        }
    ],
})
export class AppModule {
}
