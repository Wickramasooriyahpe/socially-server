import { IsNotEmpty } from "class-validator";

export class PublisherMobileDto{
    @IsNotEmpty()
    phoneNumber: string
}