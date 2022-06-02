import { IsNotEmpty, IsNumber, isNumber, MaxLength } from "class-validator";

export class PublisherMobileNoDto{
    @IsNotEmpty()
    @MaxLength(10)
    @IsNumber()
    phoneNumber: string
}