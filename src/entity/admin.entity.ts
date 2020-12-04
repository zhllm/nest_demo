import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {RoleEntity} from "./role.entity";

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "tinyint", default: 1, comment: '状态：1正常，2软删除'})
    status: number;

    @Column({nullable: true, comment: '昵称，插入记录可以为空'})
    nickname: string;

    @Column({unique: true, comment: '账号'})
    account: string;

    @Column({comment: '密码'})
    secret: string;

    @CreateDateColumn({type: "timestamp", name: 'create_at'})
    createAt: Date;

    @UpdateDateColumn({type: "timestamp", name: 'update_at'})
    updateAt: Date;

    @ManyToMany(type => RoleEntity,)
    @JoinTable({
        name: 'admin_roles',
        joinColumn: {
            name: 'admin_id', referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id', referencedColumnName: 'id',
        }
    })
    roles: Promise<RoleEntity[]>
}
