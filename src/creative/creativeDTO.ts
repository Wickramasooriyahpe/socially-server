import { IsNotEmpty } from "class-validator";
export class CreativeDTO {

    public creativeId: number;

    @IsNotEmpty()
    public creativeHeading: String;

    @IsNotEmpty()
    public destinationURL: String;

    @IsNotEmpty()
    public creativeDescription: String;

    @IsNotEmpty()
    public costPerSale: number;

    @IsNotEmpty()
    public creativeType: String;
    // public image: boolean;

   
    // public video:boolean;

   
    // public imageAndVideo:boolean;

    

}