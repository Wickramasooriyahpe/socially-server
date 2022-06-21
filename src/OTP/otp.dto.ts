import { IsNotEmpty } from "class-validator";

export class OtpDto {

    @IsNotEmpty()
    phoneNumber: string

    @IsNotEmpty()
    otp: string
}