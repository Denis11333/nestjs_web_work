import {Body, Controller, Get, Headers, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from "../auth/role-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {MessageGateway} from "../web-sockets/gateway";

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService,
                private messageGateWay : MessageGateway) {
    }

    @ApiOperation({summary:''})
    @ApiResponse({type: [User]})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get()
    async getAllNonCurrentUser(@Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return this.userService.getAllNonCurrentUser(currentUser)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get('/shared')
    async getSharedUsers(@Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return this.userService.getSharedUsers(currentUser).then(x=> x.users_to_share)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/addShare')
    async addShareUser(@Body() user: User, @Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return this.userService.addShareUser(user, currentUser)
    }

    @ApiOperation({})
    @ApiResponse({})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Post('/removeShare')
    async removeShare(@Body() user: User, @Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        this.messageGateWay.deleteSharedUnits(currentUser.username, user.username)

        return this.userService.removeShareUser(user, currentUser)
    }

}
