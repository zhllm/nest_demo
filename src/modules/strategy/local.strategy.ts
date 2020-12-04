import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, IStrategyOptions} from 'passport-local';
import {AuthService} from "../auth/auth.service";
import {AdminLoginDto} from "../../dto/admin-login.dto";
import { AdminEntity } from "src/entity/admin.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'account',
            passwordField: 'secret'
        } as IStrategyOptions);
    }

    async validate(account: string, secret: string): Promise<AdminEntity> {
        const adminLoginDto = new AdminLoginDto();
        adminLoginDto.secret = secret;
        adminLoginDto.account = account;
        return await this.authService.getAdminByAccountAndSecret(adminLoginDto);
    }
}
