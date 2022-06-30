
import { Column , JoinColumn , ManyToOne , Entity, PrimaryGeneratedColumn } from "typeorm";
import { Advertiser } from "src/advertiser/advertiser.entity";

@Entity()
export class AdvertiserTransaction{
    @PrimaryGeneratedColumn()
    transId : number

    @Column()
    amount : number

    @Column ({ nullable: true })
    date : Date

    @Column()
    status: string

    @Column()
    type: string

    // @Column()
    // public time :Date

    @Column()
    public advertiserId? : number

    @JoinColumn({name: 'advertiserId'})
    @ManyToOne(() =>Advertiser,Advertiser=> Advertiser.AdvertiserTransaction)
    public Advertiser : Advertiser;

}
