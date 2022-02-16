import { HttpException, HttpStatus, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { updateCampaignDTO } from './updateCampaign.dto';

@Injectable()
export class campaignService {

    constructor(
        @InjectRepository(Campaign)
        private campaignRepository: Repository<Campaign>,
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

    async  createCampaign(campaignCreation: Campaign): Promise<Campaign> {
        return await this.campaignRepository.save(campaignCreation);
    }

    async updateCampaign(updateCampaignDTO:updateCampaignDTO ): Promise<Campaign>{
        const{campaignId,campaignName,budget,startDate,endDate}= updateCampaignDTO;
        const Campaign = await this.getCampaignById(campaignId);
        
        Campaign.campaignName = campaignName;
        Campaign.budget =budget;
        Campaign.startDate=startDate;
        Campaign.endDate = endDate
        
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