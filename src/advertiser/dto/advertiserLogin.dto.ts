import { IsNotEmpty } from "class-validator";

export class AdvertiserLoginDto{
    
    @IsNotEmpty() readonly email :string;
    @IsNotEmpty() readonly password :string
}