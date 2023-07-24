import {Body, Controller, Get, Headers, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiTags, ApiOperation} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user-dto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {UsersService} from "../users/users.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @ApiOperation({summary: 'Authorize'})
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Register user'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({summary: 'jwtValid'})
    @Get('isJwtValid')
    @UseGuards(JwtAuthGuard)
    async isJwtValid(@Headers('Authorization') authorizationHeader) {
        let currentUser = await this.userService.getCurrentUserFromJwt(authorizationHeader)

        return {message : 'User authorize', username: currentUser.username, userId: currentUser.id}
    }
}
