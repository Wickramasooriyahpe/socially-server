import { Publisher } from "src/Publisher/publisher.entity";
import { Column, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublisherTransaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    date: string

    @Column()
    time: string

    @Column()
    type: string

    @Column()
    publisherId: number

    @JoinColumn({ name: 'publisherId' })
    @ManyToOne(() => Publisher, Publisher => Publisher.publisherId)
    public publisherID: Publisher;

}
