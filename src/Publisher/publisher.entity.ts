import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publisher{
    @PrimaryGeneratedColumn()
    publisherId : number

    @Column()
    userName: string

    @Column()
    phoneNumber: string

    @Column()
    otp:string
}
