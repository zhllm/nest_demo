import {join} from 'path';

console.log(join(__dirname, '..', "**/**/**.entity.ts"));
export default {
    type: 'mysql',
    host: '120.27.69.15',
    post: '3306',
    username: 'root',
    password: '123',
    database: 'learn_nest',
    entities: [
        join(__dirname, '..', "modules/**/*.entity.js"),
        join(__dirname, '..', "entity/*.entity.js")
    ],
    synchronize: true,
}
