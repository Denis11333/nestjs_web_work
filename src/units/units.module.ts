import {forwardRef, Module} from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import {User} from "../users/users.model";
import {Unit} from "./units.model";
import {ServiceMan} from "../service-man/service-man.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, UsersService],
  imports:[
    TypeOrmModule.forFeature([User, Unit, ServiceMan]),
    RolesModule,
    forwardRef(() => AuthModule)
  ]
})
export class UnitsModule {}
