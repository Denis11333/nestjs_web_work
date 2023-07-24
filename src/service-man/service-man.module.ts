import {forwardRef, Module} from '@nestjs/common';
import {ServiceManController} from './service-man.controller';
import {ServiceManService} from './service-man.service';
import {User} from "../users/users.model";
import {Unit} from "../units/units.model";
import {ServiceMan} from "./service-man.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WebSocketsModule} from "../web-sockets/web-sockets.module";
import {UsersModule} from "../users/users.module";
import {UnitsService} from "../units/units.service";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [ServiceManController],
    providers: [ServiceManService, UnitsService],
    imports: [
        TypeOrmModule.forFeature([User, Unit, ServiceMan]),
        RolesModule,
        WebSocketsModule,
        UsersModule,
        FilesModule,
        forwardRef(() => AuthModule)
    ]
})
export class ServiceManModule {
}
