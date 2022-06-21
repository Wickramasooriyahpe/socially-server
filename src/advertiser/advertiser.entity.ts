import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Campaign } from "src/campaign/campaign.entity";
import { avatar } from "src/UploadMedia/profileImage.entity";

@Entity()
export class Advertiser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    password : string
    
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
    @Column({nullable:true})
    avatarid:number;
    
    @Column()
    generatedOTP : number
   

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
  otpSentTime: Date

  @Column()
  isActive: boolean

  @Column()
  stripeCustomerId: string;

    @OneToMany(() => Campaign, Campaign => Campaign.Advertiser)
    public Campaign: Campaign[];

    @OneToOne(()=>avatar,avatar=> avatar.avatarid)
    public avatar: avatar;
}