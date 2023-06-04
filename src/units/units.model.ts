import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {ServiceMan} from "../service-man/service-man.model";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Unit {
    @ApiProperty({description:'PRIMARY KEY'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({maxLength:100})
    @Column({length:100})
    name: string;

    @ApiProperty({maxLength:5000})
    @Column({length:5000})
    description: string;


    @ApiProperty({type: () => [ServiceMan]})
    @OneToMany(() => ServiceMan, (serviceMans) => serviceMans.unit)
    serviceMans: ServiceMan[];

    @ApiProperty({type: () => User})
    @ManyToOne(() => User, (user) => user.units)
    user: User;
}