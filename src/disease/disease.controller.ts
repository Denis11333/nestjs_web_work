import {Body, Controller, Delete, Post} from '@nestjs/common';
import {DiseaseService} from "./disease.service";
import {CreateDiseaseDto} from "./dto/create-disease.dto";
import {Disease} from "./disease.model";

@Controller('disease')
export class DiseaseController {

    constructor(private diseaseService: DiseaseService) {
    }

    @Post()
    createDisease(@Body() createDiseaseDto: CreateDiseaseDto){
        console.log(createDiseaseDto)
        return this.diseaseService.createDisease(createDiseaseDto)
    }

    @Delete()
    deleteDisease(@Body() disease: Disease){
        return this.diseaseService.deleteDisease(disease)
    }
}
