import {Body, Controller, Post, UseGuards, Headers, Delete, Put, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UnitsService} from "./units.service";
import {CreateUnitDto} from "./dto/create-unit-dto";
import {Unit} from "./units.model";
import {UsersService} from "../users/users.service";
import {MessageGateway} from "../web-sockets/gateway";

@ApiTags("Units")
@Controller('units')
export class UnitsController {
    constructor(private unitService: UnitsService, private userService: UsersService,
                private messageGateWay: MessageGateway) {
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post()
    async createUnit(@Body() dto: CreateUnitDto, @Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        let unit = await this.unitService.createUnit(dto, currentUser)

        this.messageGateWay.sendSavedUnitToUsers(await this.userService.getMySharedUsersAndI(unit.user.id), unit, currentUser.username)

        return unit
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Delete()
    async deleteUnit(@Body() unit: Unit) {
        let result = await this.unitService.deleteUnit(unit)

        this.messageGateWay.sendDeletedUnitToUsers(await this.userService.getMySharedUsersAndI(unit.user.id), unit)

        return result
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Put()
    async changeUnit(@Body() unit: Unit) {
        let result = this.unitService.changeUnit(unit)

        this.messageGateWay.sendChangedUnitToUsers(await this.userService.getUsersWhichIShareAndShareWithMeAndCurrent(unit.user.id), unit)

        return result
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get()
    async getUnitsByUser(@Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return this.unitService.getUnitsByUser(currentUser)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/sharedUnits')
    async getSharedUnits(@Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return this.unitService.getUnitsFromShare(currentUser)
    }

}
