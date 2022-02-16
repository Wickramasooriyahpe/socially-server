export class DeleteCampaignDTO {

   
     public campaignId: number;

   
    public campaignName: String;

 
    public budget: number;

  
    public startDate: Date;

  
    public endDate: Date ;
    //@DeleteDateColumn()
    public deletedAt?: Date;
    adveID :number;
}