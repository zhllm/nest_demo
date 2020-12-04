import {EntityRepository, Repository} from "typeorm";
import {AdminEntity} from '../entity/admin.entity';
import {AdminCreateDto} from "../dto/adminCreate.dto";
import {NotFoundException, UnauthorizedException} from "@nestjs/common";
import {AdminLoginDto} from "../dto/admin-login.dto";

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity>{
    async createNewAdmin(adminCreateDto: AdminCreateDto): Promise<AdminEntity> {
        const {account, secret, nickname} = adminCreateDto;
        const hasRegister = await this.findOne({account});
        if (hasRegister) {
            throw new UnauthorizedException('账号被注册', '4000001');
        }
        try {
            const admin = new AdminEntity();
            admin.account = account;
            admin.nickname = nickname;
            admin.secret = secret;
            return await this.save(admin);
        } catch (e) {
            throw e
        }
    }

    async getAdminByAccountAndSecret(adminLoginDto: AdminLoginDto): Promise<AdminEntity> {
        const {account, secret} = adminLoginDto;
        try {
            const admin = await this.findOne({account});
            if (!admin) {
                throw new UnauthorizedException("账户或密码错误")
            }
            if (admin.secret !== secret) {
                throw new UnauthorizedException('账号或密码错误')
            }
            return admin
        } catch (e) {
            throw e;
        }
    }

    async getAdminById(id: number): Promise<AdminEntity> {
        try {
            const admin = await this.findOne({id});
            // const ads = await this.findByIds([id], {relations: ['role', '']});
            if (!admin) {
                throw new NotFoundException("用户不存在")
            }
            return admin
        } catch (e) {
            throw e;
        }
    }
}
