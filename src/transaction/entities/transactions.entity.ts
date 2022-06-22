import { Advertiser } from "src/advertiser/advertiser.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Publisher } from "src/Publisher/publisher.entity";

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  nature: string;

  @Column()
  date: Date;

  @Column()
  amount: number;


  @ManyToOne(() => Advertiser, (advertiser) => advertiser.transaction, {
    nullable: true,
  })
  advertiser: Advertiser;


  @JoinColumn({
    name: 'publisherId'
  })
  @ManyToOne(() => Publisher, (publisher) => publisher.transaction, {
    nullable: true,
  })
  publisher: Publisher;
}
