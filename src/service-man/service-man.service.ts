import {Injectable} from '@nestjs/common';
import {ServiceMan} from "./service-man.model";
import {CreateServiceManDto} from "./dto/service-man.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ServiceManService {
    constructor(@InjectRepository(ServiceMan) private serviceManRepository: Repository<ServiceMan>) {
    }

    async createServiceMan(dto: CreateServiceManDto) {
        return this.serviceManRepository.save(dto);
    }

    async changeServiceMan(serviceMan: ServiceMan) {
        return this.serviceManRepository.update(serviceMan.id, serviceMan)
    }

    async deleteServiceMan(serviceMan: ServiceMan) {
        return this.serviceManRepository.delete(serviceMan.id)
    }
}
