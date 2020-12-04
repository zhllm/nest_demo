import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";
import {JwtPayloadInterface} from "../interface/jwt-payload.interface";
import {Unauthorized} from "../../exception/exception";
import { AdminEntity } from "src/entity/admin.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            secretOrKey: process.env.CMS_API_JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
        } as StrategyOptions);
    }

    async validate(payload: JwtPayloadInterface): Promise<AdminEntity> {
        console.log('jwt.strategy 25', payload);
        const {id} = payload;
        const admin = await this.authService.getAdminById(id);
        if (!admin) throw new Unauthorized("令牌解析错误");
        return admin;
    }
}
