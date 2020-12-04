import {ApiProperty} from "@nestjs/swagger";

export class AdminLoginDto {
    @ApiProperty({description: '账号', example: 'admin'})
    account: string;

    @ApiProperty({description: '密码', example: 'admin'})
    secret: string;
}
