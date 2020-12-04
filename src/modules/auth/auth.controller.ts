import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AdminCreateDto} from '../../dto/adminCreate.dto';
import {AdminLoginDto} from "../../dto/admin-login.dto";
import {LocalAuthGuard} from "../guard/local-auth.guard";
import {UserLoginInfoInterface} from "../interface/userLoginInfo.interface";
import {Unauthorized} from "../../exception/exception";
import {JwtGuard} from "../guard/jwt.guard";
import {NoJwtAuthDecorator} from "../../decorator/no-jwt-auth.decorator";

@ApiTags("授权模块")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: '登陆'})
    @ApiBody({required: false})
    @UseGuards(LocalAuthGuard)
    @NoJwtAuthDecorator()
    @Post("login")
    async login(
        @Body() adminLoginDto: AdminLoginDto,
        @Req() req
    ): Promise<UserLoginInfoInterface> {
        const current = req.user;
        if (!current) {
            throw new UnauthorizedException();
        }
        return await this.authService.login(current);
    }


    @ApiOperation({summary: '注册'})
    @Post('register')
    @NoJwtAuthDecorator()
    async register(@Body() adminCreateDto: AdminCreateDto) {
        return await this.authService.register(adminCreateDto);
    }

    @ApiOperation({summary: '测试jwt令牌'})
    @UseGuards(JwtGuard)
    @Get('test')
    @ApiBearerAuth()
    test(@Req() req) {
        const user = req.user;
        console.log(user);
        if (!user) throw new Unauthorized("无法解析出用户信息");
        return user;
    }
}
