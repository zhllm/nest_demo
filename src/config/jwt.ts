import {JwtModuleOptions, JwtOptionsFactory} from "@nestjs/jwt";
import {Injectable} from "@nestjs/common";

@Injectable()
export class Jwt implements JwtOptionsFactory {
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {
            secret: process.env.CMS_API_JWT_SECRET, //'testOpenSecret',
            signOptions: {
                expiresIn: 60 * 60 * 2
            }
        };
    }

}
