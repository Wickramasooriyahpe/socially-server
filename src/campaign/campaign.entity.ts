import { BeforeInsert,DeleteDateColumn, Column, Entity,  PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne,ManyToOne, CreateDateColumn } from "typeorm";
import { Creative } from "src/creative/creative.entity";
import { Advertiser } from "src/advertiser/advertiser.entity";
import { Feedback } from "src/feedbacks/entities/feedback.entity";

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

    @Column({default:0})
    public status: number;

    @Column({ nullable: true })
    public startDate: Date;

    @Column({ nullable: true })
    public endDate: Date;

    @CreateDateColumn()
    public createdDate?:Date
    
    @DeleteDateColumn()
    public deletedAt?: Date;

   
    @OneToMany(() => Creative, Creative => Creative.campaign)
    public creative: Creative[];

    @JoinColumn({ name: 'advertiserId' })
    @ManyToOne(() => Advertiser, Advertiser => Advertiser.Campaign)
    public Advertiser: number;

    @OneToMany(() => Feedback, (feedback) => feedback.advertiser)
    feedback: Feedback[];

}

