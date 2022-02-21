import { IsNotEmpty,IsString ,IsUrl} from "class-validator";


export class CreativeCreationDTO {

    @IsNotEmpty()
    @IsString()
    public creativeHeading: String;

    @IsNotEmpty()
    @IsUrl()
    public destinationURL: String;

    @IsNotEmpty()
    @IsString()
    creativeDescription: String;

    @IsNotEmpty()
    @IsString()
    public creativeType: String;

    @IsNotEmpty()
    public costPerSale: number;

    public creativeTypeID: number;
    
    
}