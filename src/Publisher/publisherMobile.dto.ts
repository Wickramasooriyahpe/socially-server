import { IsNotEmpty, IsNumber, isNumber, MaxLength } from "class-validator";

export class PublisherMobileDto{
    @IsNotEmpty()
    @MaxLength(10)
    @IsNumber()
    phoneNumber: string
}