import {Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user-dto";
import {RolesService} from "../roles/roles.service";
import {CreateRoleDto} from "../roles/dto/create-role.dto";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Not, Repository} from "typeorm";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                private roleService: RolesService, private jwtService: JwtService) {

    }


    async getCurrentUserFromJwt(authorizationHeader) {
        let decodedToken = this.jwtService.decode(authorizationHeader.split(' ')[1])
        return await this.userRepository.findOne({
            where:
                {
                    id: decodedToken['id']
                },
            relations: {
                units: true,
                users_to_share: true
            }
        })
    }

    async createUser(dto: CreateUserDto) {
        let role = await this.roleService.getRoleByValue('USER')

        if (!role) {
            let createdRole: CreateRoleDto = {
                "roleName": "USER",
                "description": "simple role"
            }

            role = await this.roleService.createRole(createdRole)
        }

        return await this.userRepository.save({...dto, roles: [role]})
    }

    async getUserByUsername(username: string) {
        return await this.userRepository.findOne({
            where: {username: username},
            relations: {
                roles: true
            }
        })
    }

    async getUserById(userId: number) {
        return await this.userRepository.findOne({
            where: {id: userId},
            relations: {
                roles: true,
                users_to_share: true
            }
        })
    }

    async getAllNonCurrentUser(user: User) {
        return await this.userRepository.find({where: {id: Not(user.id)}})
    }

    async getSharedUsers(user: User) {
        return await this.userRepository.findOne({
            where: {id: user.id},
            relations: {
                users_to_share: true
            }
        })
    }

    async addShareUser(user: User, currentUser: User) {
        currentUser.users_to_share = [...currentUser.users_to_share, user]

        return this.userRepository.save(currentUser)
    }

    async removeShareUser(user: User, currentUser: User) {
        currentUser.users_to_share = [...currentUser.users_to_share.filter(x => x.id !== user.id)]

        return this.userRepository.save(currentUser)
    }

    async getUserWhoShareWithMe(user: User) {
        return await this.userRepository.find({
            where: {
                users_to_share: {
                    id: user.id
                }
            }
        })
    }

    async getUsersWhichIShareAndShareWithMeAndCurrent(userId: number) {
        let user = await this.getSharedUsers(await this.getUserById(userId))
        let userWhoShareWithMe = await this.getUserWhoShareWithMe(user)

        return [...new Set([user.username, ...user.users_to_share.map(x => x.username), ...userWhoShareWithMe.map(x => x.username)])]
    }

    async getMySharedUsersAndI(userId: number) {
        let user = await this.getSharedUsers(await this.getUserById(userId))

        return [user.username, ...user.users_to_share.map(x => x.username)]
    }
}
