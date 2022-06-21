import { IsNotEmpty, IsString } from "class-validator";


export class AdvertiserPasswordChangeDto{
    
    @IsString()
    @IsNotEmpty()
    password :string

    @IsString()
    @IsNotEmpty()
    newpassword : string
}