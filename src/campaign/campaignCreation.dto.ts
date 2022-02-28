import { IsDate,IsString, IsNotEmpty } from "class-validator"

export class campaignCreationDTO{

    @IsNotEmpty()
    @IsString()
    campaignName: String;

    @IsNotEmpty()
    budget: number;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

     adCategory : String;

    @IsNotEmpty()
    @IsDate()
    endDate: Date ;
    
    adveID :number;

    
}