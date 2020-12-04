export enum ErrorTypeEnum {
    ERROR_TYPE_DEFAULT = 999,
    ERROR_TYPE_400 = 400,
    ERROR_TYPE_401 = 401,
    ERROR_TYPE_403 = 403,
    ERROR_TYPE_404 = 404,

    ERROR_TYPE_EXPRESSIN = 407,
    ERROR_TOKEN_ERROR = 408,
}

export enum ErrorValueEnum {
    ERROR_TYPE_DEFAULT = 'server error',
    ERROR_TYPE_400 = '请求参数错误',
    ERROR_TYPE_401 = '授权失败',
    ERROR_TYPE_403 = '禁止访问',
    ERROR_TYPE_404 = '资源未找到',

    ERROR_TYPE_EXPRESSIN = '令牌已过期',
    ERROR_TOKEN_ERROR = '令牌不合法',
}
