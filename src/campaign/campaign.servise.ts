import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertiserDto } from 'src/advertiser/dto/advertiserDto';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { updateCampaignDTO } from './updateCampaign.dto';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import {getConnection} from "typeorm";

@Injectable()
export class campaignService {

    constructor(
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,

    ) { }

    async findAll(): Promise<Campaign[]> {
        const data= await this.campaignRepository.find();
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd');
        console.log(data);
        return data;
    }

    async getCampaignById(campaignId: number): Promise<Campaign> {
        try {
            return this.campaignRepository.findOne({ campaignId })
        } catch (err) {
            throw err;
        }
    }

    //Find all campaign belong to one advertiser
    async findAllCampaign(adveID: number): Promise<any> {

        const camp = await getConnection()
            .createQueryBuilder()
            .select("Campaign")
            .from(Campaign, "Campaign")
            .where("Campaign.advertiserId = :advertiserId", { advertiserId: adveID })
            .getMany();

        return camp;
    }

    async createCampaign(Advertiser: Advertiser, campaignCreation: Campaign): Promise<any> {
        campaignCreation.Advertiser = Advertiser.id;
        return await this.campaignRepository.save(campaignCreation);
    }

    async updateCampaign(updateCampaignDTO: updateCampaignDTO): Promise<Campaign> {

        const { campaignId, campaignName, budget, startDate, endDate, adCategory } = updateCampaignDTO;
        const Campaign = await this.getCampaignById(campaignId);
        Campaign.campaignName = campaignName;
        Campaign.budget = budget;
        Campaign.startDate = startDate;
        Campaign.endDate = endDate;
        Campaign.adCategory = adCategory;

        return this.campaignRepository.save(Campaign);
    }

    async softDeleteCampaign(campaignId: number) {
        const deleteRecord = await this.campaignRepository.findOne(campaignId);
        if(! deleteRecord){
          throw new NotFoundException('not found campaign');
        }
        return this.campaignRepository.softDelete(deleteRecord);
    }

    async changeStatus(campaignId: number){
        const campaign = await this.campaignRepository.findOne(campaignId);
        if(campaign){
            await this.campaignRepository.update(campaignId,{status:1})
        }
    }
}