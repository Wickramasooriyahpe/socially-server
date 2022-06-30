import { Conversion } from "../ad-sharing/conversion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "src/transaction/entities/transactions.entity";


@Entity()
export class Publisher {
    @PrimaryGeneratedColumn()
    publisherId: number

    @Column()
    userName: string

    @Column()
    phoneNumber: string

    @Column()
    otp: string

    @OneToMany(() => Conversion, Conversion => Conversion.publisher)
    conversion: Conversion[]

    @OneToMany(() => Transactions, (transaction) => transaction.publisher)
    transaction: Transactions[];
}
