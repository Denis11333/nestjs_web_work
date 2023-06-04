import {Body, Controller, Delete, Post, Put, UseGuards} from '@nestjs/common';
import {ServiceManService} from "./service-man.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateServiceManDto} from "./dto/service-man.dto";
import {ServiceMan} from "./service-man.model";

@ApiTags("Serviceman")
@Controller('service-man')
export class ServiceManController {
    constructor(private serviceManService: ServiceManService) {
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post()
    async createServiceMan(@Body() dto: CreateServiceManDto) {
        return this.serviceManService.createServiceMan(dto)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Put()
    async changeServiceMan(@Body() serviceMan: ServiceMan) {
        return this.serviceManService.changeServiceMan(serviceMan)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Delete()
    async deleteServiceMan(@Body() serviceMan: ServiceMan) {
        return this.serviceManService.deleteServiceMan(serviceMan)
    }
}
