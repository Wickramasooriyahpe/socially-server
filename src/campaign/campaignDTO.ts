import { IsNotEmpty } from "class-validator";

export class campaignDTO{
    campaignId: number;

    @IsNotEmpty()
    campaignName: String;

    @IsNotEmpty()
    budget: number;

   @IsNotEmpty() 
    adCategory : String;

    @IsNotEmpty()
    startDate: Date;

   // @IsNotEmpty()
    endDate: Date ;
    adveID :number;
}



