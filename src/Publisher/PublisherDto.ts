import { IsNotEmpty } from "class-validator";

export class PublisherDto{
    publisherId : number

    @IsNotEmpty()
    userName:string

    @IsNotEmpty()
    mobileNumber:string;
}