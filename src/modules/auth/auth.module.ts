import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from "../strategy/local.strategy";
import {Jwt} from "../../config/jwt";
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "../strategy/jwt.strategy";
import { AdminRepository } from "src/repository/admin.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository]),
        PassportModule,
        JwtModule.registerAsync({
           useClass: Jwt
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {

}
