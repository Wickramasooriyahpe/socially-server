import { IsNotEmpty, MaxLength } from "class-validator"

export class NewPublisherDto {

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @MaxLength(6)
    otp: string
}