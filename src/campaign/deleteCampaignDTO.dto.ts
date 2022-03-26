export class DeleteCampaignDTO {

    public campaignId: number;
    public campaignName: String;
    public budget: number;
    public adCategory : String;
    public startDate: Date;
    public endDate: Date ;
    public deletedAt?: Date;
    public adveID :number;
}