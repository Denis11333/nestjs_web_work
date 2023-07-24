import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ServiceManService} from "./service-man.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateServiceManDto} from "./dto/service-man.dto";
import {ServiceMan} from "./service-man.model";
import {UsersService} from "../users/users.service";
import {MessageGateway} from "../web-sockets/gateway";
import {UnitsService} from "../units/units.service";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags("Serviceman")
@Controller('service-man')
export class ServiceManController {
    constructor(private serviceManService: ServiceManService,
                private userService: UsersService,
                private unitService: UnitsService,
                private messageGateWay: MessageGateway) {
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post()
    async createServiceMan(@Body() dto: CreateServiceManDto, @Headers('Authorization') authorizationHeader) {
        let createdServiceMan = await this.serviceManService.createServiceMan(dto)

        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        this.messageGateWay.sendSavedServiceManToUsers(await this.userService.getMySharedUsersAndI
        (await this.unitService.getUserByUnitId(createdServiceMan.unit.id).then(x => x.id)), createdServiceMan, currentUser.username)

        return createdServiceMan
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Put()
    @UseInterceptors(FileInterceptor('image'))
    async changeServiceMan(@Body() serviceMan: ServiceMan, @UploadedFile() image) {
        await this.serviceManService.changeServiceMan(serviceMan, image)
        return await this.serviceManService.getServiceManById(serviceMan.id)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Delete()
    async deleteServiceMan(@Body() serviceMan: ServiceMan, @Headers('Authorization') authorizationHeader) {
        let result = this.serviceManService.deleteServiceMan(serviceMan)

        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        this.messageGateWay.sendDeletedServiceManToUsers(await this.userService.getUsersWhichIShareAndShareWithMeAndCurrent
        (await this.unitService.getUserByUnitId(serviceMan.unit.id).then(x => x.id)), serviceMan, currentUser.username)

        return result
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get(':id')
    async getServiceManById(@Param('id') serviceManId: number) {
        return this.serviceManService.getServiceManById(serviceManId)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('delete/photo')
    async deletePhotoForServiceMan(@Body() serviceMan: ServiceMan) {
        serviceMan.image = '';
        console.log(serviceMan)
        return await this.serviceManService.changeServiceMan(serviceMan, undefined);
    }
}
