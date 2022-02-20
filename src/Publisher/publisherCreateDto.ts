import { IsNotEmpty } from "class-validator"

export class PublisherCreateDto{

    @IsNotEmpty()
    userName:string

    @IsNotEmpty()
    mobileNumber:string;
}