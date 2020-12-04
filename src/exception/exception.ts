import {HttpException} from '@nestjs/common';
import {ErrorTypeEnum, ErrorValueEnum} from './error.enum';

/** 自定义异常基类 */
export class APIException extends HttpException {
    constructor(response: string | Record<string, any>, status: number) {
        super(response, status);
    }
}

/** 请求参数错误 */
export class ParamsException extends APIException {
    constructor(message?: string, errorCode?: number) {
        const response: Record<string, any> = {
            message: message || ErrorValueEnum.ERROR_TYPE_400,
            errorCode: errorCode || ErrorTypeEnum.ERROR_TYPE_400,
        };
        super(response, 400);
    }
}

/** 授权失败 */
export class Unauthorized extends APIException {
    constructor(message?: string, errorCode?: number) {
        const response: Record<string, any> = {
            message: message || ErrorValueEnum.ERROR_TYPE_401,
            errorCode: errorCode || ErrorTypeEnum.ERROR_TYPE_401
        }
        super(response, 401)
    }
}

/** 禁止访问 */
export class Forbidden extends APIException {
    constructor(message?: string, errorCode?: number) {
        const response: Record<string, any> = {
            message: message || ErrorValueEnum.ERROR_TYPE_403,
            errorCode: errorCode || ErrorTypeEnum.ERROR_TYPE_403
        }
        super(response, 403)
    }
}

/** 资源未找到 */
export class NotFound extends APIException {
    constructor(message?: string, errorCode?: number) {
        const response: Record<string, any> = {
            message: message || ErrorValueEnum.ERROR_TYPE_404,
            errorCode: errorCode || ErrorTypeEnum.ERROR_TYPE_404
        }
        super(response, 404)
    }
}

