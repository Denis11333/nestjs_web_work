import { ApiProperty } from "@nestjs/swagger";
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Role} from "../roles/roles.model";
import {Unit} from "../units/units.model";


@Entity()
export class User {
    @ApiProperty({description: 'PRIMARY KEY'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({maxLength:20})
    @Column({length:20})
    username: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty({type: [Role]})
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @ApiProperty({type: () => [Unit]})
    @OneToMany(() => Unit, (unit) => unit.user)
    units: Unit[];

    @ApiProperty({type: () => [User]})
    @ManyToMany(() => User)
    @JoinTable()
    users_to_share: User[]
}