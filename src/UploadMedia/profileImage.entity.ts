

import { Advertiser } from '../advertiser/advertiser.entity';
import { Creative } from 'src/creative/creative.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class avatar{

    @PrimaryGeneratedColumn()
    public avatarid: number;
   
    @Column({nullable: true})
    filename: string;
   
    @Column()
    public adveID : number;
   

    @JoinColumn({name: 'adveID'})
    @OneToOne(() => Advertiser , Advertiser => Advertiser.id)
    public Advertiser:Advertiser;

    // @Column()
    // public cID: number;
}