import {Controller, Get, Post} from '@nestjs/common';
import {PhotoService} from './Photo.service';
import {PhotoEntity} from "./Photo.entity";

@Controller("phone")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {
    }

    @Post()
    async add() {
        const res = await this.photoService.addPhoto();
        return res.id;
    }

    @Get('list')
    async findAll() {
        return await this.photoService.findAll()
    }
}
