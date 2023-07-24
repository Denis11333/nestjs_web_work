import {ApiProperty} from "@nestjs/swagger";
import {Unit} from "../units/units.model";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class ServiceMan {
    @ApiProperty({description: 'PRIMARY KEY'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({maxLength: 100})
    @Column({length: 100})
    fullName: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100})
    rank: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100})
    position: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    dateOfBirth: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    nationality: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    religiousBeliefs: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    placeOfBirth: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    sex: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    maritalStatus: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    phoneNumber: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    dataOfEntryIntoMilitaryService: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    specialty: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    qualification: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    militaryTicketNumber: string

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    passportNumber: string

    @ApiProperty()
    @Column({nullable: true})
    financialSupport: number

    @ApiProperty({maxLength: 100})
    @Column({length: 100, nullable: true})
    serviceTraffic: string

    @Column({length: 100, nullable: true})
    operations: string

    @Column()
    image: string

    @ApiProperty({type: () => Unit})
    @ManyToOne(() => Unit, (unit) => unit.serviceMans, {
        onDelete: 'CASCADE'
    })
    unit: Unit;

    // @OneToMany(() => Disease, (disease) => disease.serviceMan)
    // diseases: Disease[]
}
