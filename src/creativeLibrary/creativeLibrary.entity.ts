import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreativeLibrary {

    //@PrimaryGeneratedColumn()
     //public creativeLibraryId: number;

     //@Column()
     //public creativeID:number;

    // @Column({nullable: true})
      //public thumbnailImage: string;

      @PrimaryGeneratedColumn()
      public id: number;

      @Column({default: ''})
      avatar: string;
 
  // @Column()
  // filename: string;
 
  // @Column()
  // path: string;
 
  // @Column()
  // mimetype: string;

}