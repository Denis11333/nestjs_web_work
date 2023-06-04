import {Injectable} from '@nestjs/common';
import {Unit} from "./units.model";
import {CreateUnitDto} from "./dto/create-unit-dto";
import {User} from "../users/users.model";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, In} from "typeorm";
import {UsersService} from "../users/users.service";

@Injectable()
export class UnitsService {
    constructor(@InjectRepository(Unit) private unitRepository: Repository<Unit>,
                private userService: UsersService) {
    }

    async getUnitsByUser(user: User) {
        return await this.unitRepository.find({
            where: {
                user: user
            },
            relations: {
                serviceMans: true
            }
        })
    }

    async createUnit(dto: CreateUnitDto, user: User) {
        return this.unitRepository.save({...dto, user: user});
    }

    async changeUnit(unit: Unit) {
        return await this.unitRepository.update(unit.id,
            {
                name: unit.name,
                description: unit.description
            })
    }

    async deleteUnit(unit: Unit) {
        return await this.unitRepository.delete(unit.id)
    }

    async getUnitsFromShare(user: User) {
        let usersWhoShareWithMe = await this.userService.getUserWhoShareWithMe(user)

        if(usersWhoShareWithMe.length === 0){
            return []
        }

        return await this.unitRepository.find({
            where: {
                user: {
                    id: In([usersWhoShareWithMe.map(x => x.id)]),
                }
            },
            relations: {
                serviceMans: true,
                user: true
            }
        })
    }

}
