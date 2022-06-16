import { HttpException, HttpStatus, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { campaignCreationDTO } from './campaignCreation.dto';
import { updateCampaignDTO } from './updateCampaign.dto';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { AdvertiserService } from 'src/advertiser/advertiser.service';

@Injectable()
export class campaignService {

    constructor(
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
      
    ) { }
    
    async  findAll(): Promise<Campaign[]> {
        return await this.campaignRepository.find();
    }

    async getCampaignById(campaignId:number):Promise<Campaign>{
        try{
            return this.campaignRepository.findOne({campaignId})
        }catch(err){
            throw err;
        }    
    }

   
    async  createCampaign(Advertiser:Advertiser,campaignCreation: Campaign): Promise<any>{
    campaignCreation.Advertiser=Advertiser;
    return await this.campaignRepository.save(campaignCreation);
        
    }

    async updateCampaign(updateCampaignDTO:updateCampaignDTO ): Promise<Campaign>{
        
        const{campaignId,campaignName,budget,startDate,endDate,adCategory}= updateCampaignDTO;
        const Campaign = await this.getCampaignById(campaignId);
        Campaign.campaignName = campaignName;
        Campaign.budget =budget;
        Campaign.startDate=startDate;
        Campaign.endDate = endDate;
        Campaign.adCategory=adCategory;
        
        return this.campaignRepository.save(Campaign);
    }

    async softDeleteCampaign(campaignId: number){
        const deleteRecord = await this.campaignRepository.findOne(campaignId);
        if(! deleteRecord){
          throw new NotFoundException('not found creative');
        }
        return this.campaignRepository.softDelete(deleteRecord);
      }
    }