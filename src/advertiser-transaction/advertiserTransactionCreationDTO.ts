import { IsDate,IsString, IsNotEmpty } from "class-validator"

export class advertiserTransactionCreationDTO{

    @IsNotEmpty()
    amount: number

   // @IsNotEmpty()
    date: Date

    // @IsNotEmpty()
    // time: string
    
    status: string
    type: string
    advertiserID :number;
   
}