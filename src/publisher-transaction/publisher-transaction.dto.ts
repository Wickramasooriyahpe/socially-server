import { IsNotEmpty, MaxLength } from "class-validator"

export class PublisherTransactionDTO{

    @IsNotEmpty()
    amount :number

    @IsNotEmpty()
    date :string

    @IsNotEmpty()
    time :string

    @IsNotEmpty()
    type :string
    
}