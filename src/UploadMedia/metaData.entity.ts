import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class uploadMdata {

    @PrimaryGeneratedColumn()
    public uploadid: number;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    mimetype: string;

    // @JoinColumn({name: 'cID'})
    // @OneToOne(() => Creative , Creative => Creative.creativeId)
    // public Creative: Creative;

    @Column()
    public cID: number;
}