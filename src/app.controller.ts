import {Controller, Get, Param, Render} from '@nestjs/common';
import {AppService} from './app.service';
import { NoJwtAuthDecorator } from './decorator/no-jwt-auth.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @NoJwtAuthDecorator()
    @Get('hello')
    getHello(): string {
        return "'Hello World!"
    }

    @Get()
    @Render('index')
    index(): any {
        return {
            message: 'hbs'
        }
    }

    @Get(':id')
    getId(@Param() params): any {
        return `${params.id}`
    }
}
