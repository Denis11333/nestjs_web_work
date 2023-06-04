import {ApiProperty} from "@nestjs/swagger";

export class CreateServiceManDto {
    @ApiProperty()
    readonly fullName: string;
    @ApiProperty()
    readonly rank: string;
    @ApiProperty()
    readonly position: string;
    @ApiProperty()
    readonly status: string
    @ApiProperty()
    readonly isMilitary: boolean;
    @ApiProperty()
    readonly unitId: number
}