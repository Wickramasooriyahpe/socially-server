import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Campaign } from "src/campaign/campaign.entity";

@Entity()
export class Advertiser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string

    @Column()
  email: string;

    @Column()
    password : string

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