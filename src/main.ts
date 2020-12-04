import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const options = new DocumentBuilder()
        .setTitle("Api Doc")
        .setDescription("this is doc for apis")
        .setVersion('1.0')
        .addTag("moc")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.useStaticAssets(join(__dirname, '..', 'public'), {
        prefix: '/static'
    });
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.listen(3000);
}

bootstrap();
