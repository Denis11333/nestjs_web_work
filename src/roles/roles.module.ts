import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      TypeOrmModule.forFeature([Role, User])
  ],
    exports:[
        RolesService
    ]
})
export class RolesModule {}
