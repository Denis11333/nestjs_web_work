import {forwardRef, Module} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      TypeOrmModule.forFeature([Role, User]),
      forwardRef(() => AuthModule),
  ],
    exports:[
        RolesService
    ]
})
export class RolesModule {}
