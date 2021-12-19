import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Advertiser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
}