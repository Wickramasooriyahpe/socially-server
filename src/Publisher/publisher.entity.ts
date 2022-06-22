import { Conversion } from "../ad-sharing/conversion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher {
    @PrimaryGeneratedColumn()
    publisherId: number

    @Column()
    userName: string

    @Column()
    phoneNumber: string

    @Column()
    otp: string

    @OneToMany(() => Conversion, Conversion => Conversion.publisher)
    public conversion: Conversion[]
}
