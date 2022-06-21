import { Creative } from "../creative/creative.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreativeLibrary {

  @PrimaryGeneratedColumn()
  public creativeLibraryId: number;

  @Column()
  public creID: number;

  @Column({ nullable: true })
  public thumbnailImagePath: string;


  /* relationships*/

  @JoinColumn({ name: 'creID' })
  @OneToOne(() => Creative, Creative => Creative.creativeId)
  public Creative: Creative;

      @Column({nullable: true})
      public  realImage: string;
     
  
 
 

}