import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Campaign } from "src/campaign/campaign.entity";

@Entity()
export class Advertiser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({nullable:true})
    role: string;

    @Column({nullable:true})
    lname: string

    @Column({nullable:true})
    company: string

    @Column({nullable:true})
    address: string

    @Column({nullable:true})
    phone: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
    @Column()
    generatedOTP : number

    @Column()
    otpSentTime : Date

    @Column()
    isActive:boolean

    @OneToMany(() => Campaign, Campaign => Campaign.Advertiser)
    public Campaign: Campaign[];
}