import { Conversion } from './../ad-sharing/conversion.entity';
import { Column, JoinColumn, OneToOne, ManyToOne, Entity, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, CreateDateColumn } from "typeorm";
import { Campaign } from "../campaign/campaign.entity";
import { CreativeLibrary } from "../creativeLibrary/creativeLibrary.entity";
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
@Entity()
export class Creative {

    @PrimaryGeneratedColumn()
    public creativeId: number;

    @Column()
    public creativeHeading: String;

    @Column()
    public destinationURL: String;

    @Column({ nullable: true })
    public creativeDescription: String;

    @Column()
    public costPerSale: number;

    @Column({default:0})
    public status: number;

    @Column()
    public creativeType: String;

    @CreateDateColumn()
    public createdDate?:Date


    @DeleteDateColumn()
    public deletedAt?: Date;


    @JoinColumn({ name: 'campaignId' })
    @ManyToOne(() => Campaign, Campaign => Campaign.creative)
    public campaign: number;

    @OneToOne(() => CreativeLibrary, CreativeLibrary => CreativeLibrary.creativeLibraryId)
    public CreativeLibrary: CreativeLibrary;

    @OneToMany(() => Conversion, Conversion => Conversion.creative)
    public conversion: Conversion[]


    @OneToMany(() => Feedback, (feedback) => feedback.advertiser)
    feedback: Feedback[];


}
