import { IsNotEmpty } from "class-validator";

export class campaignDTO{
    campaignId: number;

    @IsNotEmpty()
    campaignName: String;

    @IsNotEmpty()
    budget: number;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date ;
    adveID :number;
}



