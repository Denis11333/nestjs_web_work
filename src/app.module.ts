import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import * as process from "process";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {AuthModule} from './auth/auth.module';
import { UnitsModule } from './units/units.module';
import { ServiceManModule } from './service-man/service-man.module';
import {Unit} from "./units/units.model";
import {ServiceMan} from "./service-man/service-man.model";
import {TypeOrmModule} from "@nestjs/typeorm";
import { WebSocketsModule } from './web-sockets/web-sockets.module';
import {FilesModule} from "./files/files.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { DiseaseModule } from './disease/disease.module';
import * as path from "path";
import {Disease} from "./disease/disease.model";

@Module({
    controllers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "..", "static")
        }),
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            database: process.env.MYSQL_DB,
            host: process.env.MYSQL_HOST,
            password: process.env.MYSQL_PASSWORD,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            entities: [User, Role, Unit, ServiceMan, Disease],
            synchronize: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        UnitsModule,
        ServiceManModule,
        WebSocketsModule,
        FilesModule,
        DiseaseModule
    ],
    providers: []
})
export class AppModule {
}
