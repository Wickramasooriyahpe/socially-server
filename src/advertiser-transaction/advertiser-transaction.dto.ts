import { IsNotEmpty } from "class-validator"

export class AdvertiserTransactionDTO {

    @IsNotEmpty()
    amount: number

    date: Date
    // status: boolean
    // type: string
    advertiserID :number;
   
}