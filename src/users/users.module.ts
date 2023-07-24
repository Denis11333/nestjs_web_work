import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UnitsService} from "../units/units.service";
import {Unit} from "../units/units.model";
import {WebSocketsModule} from "../web-sockets/web-sockets.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, UnitsService],
    imports: [
        TypeOrmModule.forFeature([User, Role, Unit]),
        RolesModule,
        WebSocketsModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {
}
