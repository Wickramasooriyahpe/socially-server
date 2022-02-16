import { BeforeInsert, Column,JoinColumn, OneToOne,ManyToOne, Entity, PrimaryGeneratedColumn ,DeleteDateColumn} from "typeorm";
import { Campaign } from "src/campaign/campaign.entity";
import { CreativeLibrary } from "src/creativeLibrary/creativeLibrary.entity";
@Entity()
export class Creative {

    @PrimaryGeneratedColumn()
     public creativeId: number;

    @Column()
    public creativeHeading: String;

    @Column()
    public destinationURL: String;

    @Column()
    public creativeDescription: String;

    @Column()
    public costPerSale: number;

    @Column()
    public creativeType: String;

    // @Column()
    // public image: boolean;

    // @Column()
    // public video:boolean;

    // @Column()
    // public imageAndVideo:boolean;

    @DeleteDateColumn()
    public deletedAt?: Date;

    @JoinColumn({name: 'campID'})
    @ManyToOne (() => Campaign,Campaign => Campaign.campaignId)
    public campaign: Campaign;

    @Column()
    public campID:number;
   

}
