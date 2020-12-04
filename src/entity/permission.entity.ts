import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {RoleEntity} from "./role.entity";

@Entity('permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, comment: '权限名称'})
    name: string;

    @Column({type: "tinyint", default: 1, comment: '状态1，正常，0，伪删除'})
    status: number;

    @Column({nullable: true, comment: '注释'})
    description: string;

    @Column({default: 300, comment: '权限类型：1 菜单，2 按钮， 3 通用'})
    type: string;

    @Column({nullable: true, comment: '父级权限id'})
    parentId: number;

    @Column({comment: '权限对应的路由，正则'})
    path: string;

    @Column({comment: '菜单权限时，可配置显示的图标名', nullable: true})
    icon: string;

    @CreateDateColumn({type: "timestamp", name: 'create_at'})
    createAt: Date;

    @UpdateDateColumn({type: "timestamp", name: 'update_at'})
    updateAt: Date;

    @ManyToMany(type1 => RoleEntity)
    roles: Promise<RoleEntity>
}
