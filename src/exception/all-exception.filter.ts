import {Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus} from "@nestjs/common";
import {ErrorTypeEnum, ErrorValueEnum} from "./error.enum";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | Error | any, host: ArgumentsHost): any {

        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log(exception);

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorCode = exception.response?.errorCode || ErrorTypeEnum.ERROR_TYPE_DEFAULT;
        const message = exception.message || ErrorValueEnum.ERROR_TYPE_DEFAULT;

        response
            .status(status)
            .json({
                message,                                        // 错误消息
                errorCode,                                      // 自定义的错误码
                request: `${request.method} ${request.path}`,   // 请求地址
                timestamp: new Date().toISOString(),            // 响应的时间戳
                statusCode: status                              // 状态码
            });
    }

}
