import { IsNotEmpty } from "class-validator";

export class PublisherDto {
    publisherId: number

    userName: string

    @IsNotEmpty()
    phoneNumber: string;

    otp: string
}