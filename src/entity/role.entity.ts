import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {AdminEntity} from "./admin.entity";
import {PermissionEntity} from "./permission.entity";

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "tinyint", default: 1, comment: '状态：1正常，2软删除'})
    status: number;

    @Column({unique: true, comment: '角色名称, 唯一'})
    name: string;

    @Column({nullable: true, comment: '注释'})
    description: string;

    @CreateDateColumn({type: "timestamp", name: 'create_at'})
    createAt: Date;

    @UpdateDateColumn({type: "timestamp", name: 'update_at'})
    updateAt: Date;

    @ManyToMany(type => AdminEntity)
    admins: Promise<AdminEntity>;

    @ManyToMany(type => PermissionEntity)
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        }
    })
    permissions: Promise<PermissionEntity[]>
}
