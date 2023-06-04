import {forwardRef, Module} from '@nestjs/common';
import { ServiceManController } from './service-man.controller';
import { ServiceManService } from './service-man.service';
import {User} from "../users/users.model";
import {Unit} from "../units/units.model";
import {ServiceMan} from "./service-man.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [ServiceManController],
  providers: [ServiceManService],
  imports:[
    TypeOrmModule.forFeature([User, Unit, ServiceMan]),
    RolesModule,
    forwardRef(() => AuthModule)
  ]
})
export class ServiceManModule {}
