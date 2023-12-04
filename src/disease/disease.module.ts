import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Disease} from "./disease.model";

@Module({
  controllers: [DiseaseController],
  providers: [DiseaseService],
  imports:[
    TypeOrmModule.forFeature([Disease]),
  ]
})
export class DiseaseModule {}
