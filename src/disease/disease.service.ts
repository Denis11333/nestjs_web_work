import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Disease} from "./disease.model";
import {Repository} from "typeorm";
import {CreateDiseaseDto} from "./dto/create-disease.dto";

@Injectable()
export class DiseaseService {
    constructor(@InjectRepository(Disease) private diseaseRepository: Repository<Disease>) {
    }

    createDisease(createDiseaseDto: CreateDiseaseDto) {
        return this.diseaseRepository.save(createDiseaseDto)
    }

    changeDisease(disease: Disease) {
        return this.diseaseRepository.update(disease.id, disease)
    }

    deleteDisease(disease: Disease) {
        return this.diseaseRepository.delete(disease)
    }
}
