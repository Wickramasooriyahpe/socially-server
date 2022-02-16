export class DeleteCreativeDTO {

    public creativeId:number;
    public creativeHeading: String;
    public destinationURL: String;
    public creativeDescription: String;
    public costPerSale: number;
    public creativeType: String;

    //public creativeTypeID: number;
    // public image: boolean;
    // public video:boolean;
    // public imageAndVideo:boolean;
    public deletedAt:Date;
}