import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto{

    @ApiProperty()
    @IsString({message: 'username must be string'})
    @Length(3, 20, {message: 'username length must be between 4 and 16'})
    readonly username: string;

    @ApiProperty()
    @IsString({message: 'password must be string'})
    @Length(5, 30, {message: 'password length must be between 4 and 16'})
    readonly password: string;
}