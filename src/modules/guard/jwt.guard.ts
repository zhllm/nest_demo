import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Observable} from "rxjs";
import {Unauthorized} from "../../exception/exception";
import {Reflector} from "@nestjs/core";


/**
 * JwtGuard 实际也是靠 JwtGuard 通过返回true / false 判断当前请求是否通过
 * 返回 true 表示校验通过，返回false 表示抛出异常
 * */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(
        private readonly reflector: Reflector,
    ) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const key = 'notJwtAuthGuard';

        const notJwtAuthGuard = this.reflector.getAllAndMerge<string[]>(key, [
            context.getHandler(),
            context.getClass(),
        ]);

        let hasKey = false;

        if (typeof notJwtAuthGuard === "string") {
            hasKey = key === notJwtAuthGuard;
        }

        if (Array.isArray(notJwtAuthGuard)) {
            hasKey = notJwtAuthGuard.some(item => item === key);
        }

        if (hasKey) {
            console.log('接口： ', context.switchToHttp().getRequest().path, '无须令牌也能访问的接口');
            return true;
        }

        return super.canActivate(context);
    }

    // 异常处理
    handleRequest(err, user, info) {
        console.log(err, user, info);
        if (err || !user) {
            throw err || new Unauthorized('接口未授权');
        }
        return user
    }
}
