import { IsEmail, IsNotEmpty } from "class-validator"

export class AdvertiserTopupDto{


    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    amount:number
}