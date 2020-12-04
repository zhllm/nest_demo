import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

interface Response<T> {
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>)
        : Observable<Response<T>> | Promise<Observable<Response<T>>> {
        return next.handle().pipe(
            map(data => ({
                errorCode: 0,
                message: 'ok',
                data,
            }))
        );
    }

}
