import {SetMetadata} from "@nestjs/common";

export const NoJwtAuthDecorator = (notJwtAuthGuard = 'notJwtAuthGuard') =>
    SetMetadata('notJwtAuthGuard', notJwtAuthGuard);
