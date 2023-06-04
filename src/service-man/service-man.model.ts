import {ApiProperty} from "@nestjs/swagger";
import {Unit} from "../units/units.model";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BOOLEAN} from "sequelize";
import {isBoolean} from "class-validator";


@Entity()
export class ServiceMan {
    @ApiProperty({description: 'PRIMARY KEY'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({maxLength:100})
    @Column({length:100})
    fullName: string

    @ApiProperty({maxLength:100})
    @Column({length:100})
    rank: string

    @ApiProperty({maxLength:100})
    @Column({length:100})
    position: string

    @ApiProperty({maxLength:100})
    @Column({default: '', length:100})
    status: string

    @ApiProperty({maxLength:100})
    @Column({default: '', length:100})
    statusDescription: string

    @ApiProperty({maxLength:100})
    @Column({default: '', length:100})
    notes: string

    @ApiProperty({type: Boolean})
    @Column()
    isMilitary: boolean

    @ApiProperty({type: () => Unit})
    @ManyToOne(() => Unit, (unit) => unit.serviceMans, {
        onDelete: 'CASCADE'
    })
    unit: Unit;
}