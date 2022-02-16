

import { Creative } from 'src/creative/creative.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class uploadMdata{

    @PrimaryGeneratedColumn()
    public uploadid: number;
   
    @Column()
    filename: string;
   
    @Column()
    path: string;
   
    @Column()
    mimetype: string;

    @JoinColumn({name: 'cID'})
    @OneToOne(() => Creative , Creative => Creative.creativeId)
    public Creative: Creative;

    @Column()
    public cID: number;
}