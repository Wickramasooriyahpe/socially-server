import { BeforeInsert,DeleteDateColumn, Column, Entity,  PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne,ManyToOne } from "typeorm";
import { Creative } from "src/creative/creative.entity";
import { Advertiser } from "src/advertiser/advertiser.entity";

@Entity()
export class Campaign {

    @PrimaryGeneratedColumn()
    public campaignId: number;

    @Column()
    public campaignName: String;

    @Column()
    public budget: number;

    @Column()
    public adCategory: String;

    @Column({ nullable: true })
    public startDate: Date;

    @Column({ nullable: true })
    public endDate: Date;

    @DeleteDateColumn()
    public deletedAt?: Date;

    @Column()
    public adveID?: number;

    @OneToMany(() => Creative, Creative => Creative.campaign)
    public creative: Creative[];

    @JoinColumn({ name: 'adveID' })
    @ManyToOne(() => Advertiser, Advertiser => Advertiser.Campaign)
    public Advertiser: Advertiser;

}

