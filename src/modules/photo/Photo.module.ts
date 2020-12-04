import {Module} from '@nestjs/common';
import {PhotoController} from './Photo.controller';
import {PhotoService} from './Photo.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotoEntity} from './Photo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PhotoEntity])],
    controllers: [PhotoController],
    providers: [PhotoService],
})
export class PhotoModule {

}
