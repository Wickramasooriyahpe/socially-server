import { Creative } from "src/creative/creative.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreativeLibrary {

    @PrimaryGeneratedColumn()
     public creativeLibraryId: number;

     @Column()
     public creID:number;

    @Column({nullable: true})
      public thumbnailImagePath: string;


    /* relationships*/
      
    @JoinColumn({name:'creID'})
    @OneToOne(() =>Creative , Creative => Creative.creativeId)
    public Creative:Creative; 
 
 

}