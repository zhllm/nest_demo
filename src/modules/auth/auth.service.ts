import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AdminLoginDto} from "../../dto/admin-login.dto";
import {AdminCreateDto} from "../../dto/adminCreate.dto";
import {JwtPayloadInterface} from '../interface/jwt-payload.interface';
import {JwtService} from '@nestjs/jwt';
import {UserLoginInfoInterface} from "../interface/userLoginInfo.interface";
import { AdminRepository } from 'src/repository/admin.repository';
import { AdminEntity } from 'src/entity/admin.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly usersService: AdminRepository,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(adminCreateDto: AdminCreateDto): Promise<{ msg: string }> {
        await this.usersService.createNewAdmin(adminCreateDto);
        return {
            msg: '注册成功'
        }
    }

    async getAdminByAccountAndSecret(adminLoginDto: AdminLoginDto): Promise<AdminEntity> {
        return await this.usersService.getAdminByAccountAndSecret(adminLoginDto);
    }

    async generateTokenByPayload(jwtPayload: JwtPayloadInterface): Promise<string> {
        return await this.jwtService.signAsync(jwtPayload);
    }

    async getAdminById(id: number): Promise<AdminEntity> {
        return await this.usersService.getAdminById(id);
    }

    async login(admin: AdminEntity): Promise<UserLoginInfoInterface> {
        const {id, nickname} = admin;

        const payload: JwtPayloadInterface = {id};
        const token = await this.generateTokenByPayload(payload);

        const info = {
            name: nickname,
            roles: []
        };
        const permissions = [];
        const menu = [];
        return {
            token,
            info,
            menu,
            permissions
        }
    }
}
