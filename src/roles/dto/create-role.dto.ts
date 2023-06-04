import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty()
    readonly roleName: string;
    @ApiProperty()
    readonly description : string;
}