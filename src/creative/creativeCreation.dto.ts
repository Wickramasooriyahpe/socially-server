import { IsNotEmpty,IsString ,IsUrl} from "class-validator";


export class CreativeCreationDTO {

    @IsNotEmpty()
    @IsString()
    public creativeHeading: String;

    @IsNotEmpty()
   // @IsString()
    @IsUrl()
    public destinationURL: String;

    @IsNotEmpty()
    @IsString()
    creativeDescription: String;

    @IsNotEmpty()
    public costPerSale: number;

    public creativeTypeID: number;
    
    
}