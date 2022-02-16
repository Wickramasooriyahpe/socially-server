import { IsNotEmpty } from "class-validator";


export class viewCreativeDTO {

    public creativeId: number;

    @IsNotEmpty()
    public creativeHeading: String;

    @IsNotEmpty()
    public destinationURL: String;

    @IsNotEmpty()
    public costPerSale: number;

    @IsNotEmpty()
    public creativeType: String;
  
}