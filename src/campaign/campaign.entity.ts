import { BeforeInsert,DeleteDateColumn, Column, Entity,  PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne,ManyToOne } from "typeorm";
import { Creative } from "src/creative/creative.entity";
import { Advertiser } from "src/Advertiser/advertiser.entity";

@Entity()
export class Campaign {

    @PrimaryGeneratedColumn()
     public campaignId: number;

    @Column()
    public campaignName: String;

    @Column()
    public budget: number;

    @Column()
    public startDate: Date;

    @Column()
    public endDate: Date ;

    @DeleteDateColumn()
    public deletedAt?: Date;

    @Column()
    public adveID :number;

    @OneToMany(()=> Creative,Creative=> Creative.creativeId, )
    public creative :Creative[];

    @JoinColumn({name: 'adveID'})
    @ManyToOne(() =>Advertiser,Advertiser=> Advertiser.id,)
    public Advertiser : Advertiser;

}

