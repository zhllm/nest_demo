import {Get, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PhotoEntity} from "./Photo.entity";

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(PhotoEntity)
        private readonly photoRepository: Repository<PhotoEntity>
    ) {
    }

    async addPhoto(): Promise<PhotoEntity> {
        const photo = new PhotoEntity();
        photo.description = '123';
        photo.filename = '234';
        photo.isPublished = false;
        photo.name = "wonderful";
        photo.views = 123;
        return await this.photoRepository.save(photo);
    }

    async findAll(): Promise<PhotoEntity[]> {
        return await this.photoRepository.find();
    }

}
