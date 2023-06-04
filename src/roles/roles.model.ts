import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {
    @ApiProperty({description: 'PRIMARY KEY'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    roleName: string;

    @ApiProperty({description: 'What user with this role can'})
    @Column()
    description: string;
}