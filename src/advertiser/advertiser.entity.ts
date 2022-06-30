import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Campaign } from "src/campaign/campaign.entity";
import { avatar } from "src/UploadMedia/profileImage.entity";
import { Transactions } from "src/transaction/entities/transactions.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";
import { AdvertiserTransaction } from "src/advertiser-transaction/advertiser-transaction.entity";
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

   
  static stripeCustomerId: string;

  

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

  @OneToMany(() => Transactions, (transaction) => transaction.advertiser)
  transaction: Transactions[];

  @OneToMany(() => Feedback, (feedback) => feedback.advertiser)
  feedback: Feedback[];

  @OneToMany(() => AdvertiserTransaction, AdvertiserTransaction => AdvertiserTransaction.Advertiser)
  public AdvertiserTransaction: AdvertiserTransaction[];
}