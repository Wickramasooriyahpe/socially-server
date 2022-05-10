import { IsNotEmpty } from "class-validator"

export class AdvertiserVerifyDto{

    @IsNotEmpty() readonly email :string;
    @IsNotEmpty() readonly enteredOTP:number

    isActive:boolean
}