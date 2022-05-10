import { IsEmail, IsNotEmpty } from "class-validator"

export class AdvertiserCreateDto{

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    generatedOTP:number
    otpSentTime : Date
    isActive:boolean

   Campaign: number[];
}