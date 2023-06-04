import {ApiProperty} from "@nestjs/swagger";

export class CreateUnitDto{

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;
}