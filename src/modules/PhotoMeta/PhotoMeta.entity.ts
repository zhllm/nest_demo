import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class PhotoMetaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    height: number;

    @Column()
    width: number;

    @Column()
    orientation: string;

    @Column()
    compressed: boolean;

    @Column()
    comment: string;
    @OneToOne(type => PhotoMetaEntity)

    @JoinColumn()
    photo: PhotoMetaEntity;
}
