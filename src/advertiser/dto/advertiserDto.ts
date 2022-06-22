import { IsEmail, IsNotEmpty } from "class-validator"

export class AdvertiserDto{
    id:number

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    role:string

    @IsNotEmpty()
    password:string

   // avatar:string
    generatedOTP:number
    otpSentTime : Date
    isActive:boolean
    stripeCustomerId: string;

}