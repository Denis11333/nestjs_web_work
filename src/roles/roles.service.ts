import {Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./roles.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    async createRole(dto: CreateRoleDto) {
        return this.roleRepository.save(dto);
    }

    async getRoleByValue(roleName: string) {
        return this.roleRepository.findOne({where: {roleName: roleName}})
    }
}
