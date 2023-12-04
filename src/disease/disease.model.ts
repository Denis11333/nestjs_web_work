import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ServiceMan} from "../service-man/service-man.model";
@Entity()
export class Disease{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    date: string

    // @ManyToOne(() => ServiceMan, (serviceMan) => serviceMan.diseases)
    // serviceMan: ServiceMan
}
