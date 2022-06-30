import { Publisher } from '../Publisher/publisher.entity';
; import { Creative } from '../creative/creative.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversion {

    @PrimaryGeneratedColumn()
    conversionId: number;
  

    @Column()
    public visitorId: string
    

    @CreateDateColumn()
    public date: Date

    @JoinColumn({ name: 'creativeId' })
    @ManyToOne(() => Creative, Creative => Creative.conversion)
    public creative: Creative

    @JoinColumn({ name: 'publisherId' })
    @ManyToOne(() => Publisher, Publisher => Publisher.conversion)
    public publisher: Publisher
}