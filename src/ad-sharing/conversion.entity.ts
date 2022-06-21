import { Publisher } from '../Publisher/publisher.entity';
; import { Creative } from '../creative/creative.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Conversion {
    @PrimaryColumn()
    public creativeId: number

    @PrimaryColumn()
    public publisherId: number

    @PrimaryColumn()
    public visitorId: string

    @CreateDateColumn()
    public date: Date

    @JoinColumn({ name: 'creativeId' })
    @ManyToOne(() => Creative, Creative => Creative.conversion, { primary: true })
    public creative: Creative

    @JoinColumn({ name: 'publisherId' })
    @ManyToOne(() => Publisher, Publisher => Publisher.conversion, { primary: true })
    public publisher: Publisher
}