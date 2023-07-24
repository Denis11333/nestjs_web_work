import {Injectable} from '@nestjs/common';
import {ServiceMan} from "./service-man.model";
import {CreateServiceManDto} from "./dto/service-man.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilesService} from "../files/files.service";

@Injectable()
export class ServiceManService {
    constructor(@InjectRepository(ServiceMan) private serviceManRepository: Repository<ServiceMan>,
                private fileService: FilesService) {
    }

    async createServiceMan(dto: CreateServiceManDto) {
        return this.serviceManRepository.save({...dto, image: 'default_image.png'});
    }

    async changeServiceMan(serviceMan: ServiceMan, image) {

        if (image) {
            serviceMan.image = await this.fileService.createFile(image)
        }

        return this.serviceManRepository.update(serviceMan.id, serviceMan)
    }

    async deleteServiceMan(serviceMan: ServiceMan) {
        return this.serviceManRepository.delete(serviceMan.id)
    }

    async getServiceManById(serviceManId: number) {
        return this.serviceManRepository.findOne({
            where: {id: serviceManId},
            relations: {unit: true}
        })
    }
}
