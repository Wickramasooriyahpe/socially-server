import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Creative } from '../../creative/creative.entity';
import { Campaign } from '../../campaign/campaign.entity';
import { Advertiser } from 'src/advertiser/advertiser.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feedback: string;

  @Column({ nullable: true })
  date?: Date;

  @ManyToOne(() => Advertiser, (advertiser) => advertiser.feedback, {
    nullable: true,
  })
  advertiser: Advertiser;

  @JoinColumn({ name: 'creativeId' })
  @ManyToOne(() => Creative, (creative) => creative.feedback, {
    nullable: true,
  })
  creative: Creative;

  @JoinColumn({ name: 'campaignId' })
  @ManyToOne(() => Campaign, (campaign) => campaign.feedback, {
    nullable: true,
  })
  campaign: Campaign;
}
