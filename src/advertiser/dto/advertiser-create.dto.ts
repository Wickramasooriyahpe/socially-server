import { IsEmail, IsNotEmpty } from "class-validator"

export class AdvertiserCreateDto{

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    avatar:string
    generatedOTP:number
    otpSentTime : Date
    isActive:boolean


    stripeCustomerId: string;

  Campaign: number[];
}