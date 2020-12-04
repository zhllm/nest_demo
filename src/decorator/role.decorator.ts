import {SetMetadata} from "@nestjs/common";

export const RoleDecorator = (...roles: string[]) => SetMetadata(roles, roles);
