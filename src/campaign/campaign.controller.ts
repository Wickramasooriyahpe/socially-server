import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { campaignService } from './campaign.servise';
import { campaignCreationDTO } from './campaignCreation.dto';
import { DeleteCampaignDTO } from './deleteCampaignDTO.dto';
import { updateCampaignDTO } from './updateCampaign.dto';


@Controller('campaign')
export class campaignController {
    constructor(private readonly campaignService : campaignService){}

    @Get()
    getAllCampaign(){
         return this.campaignService.findAll();
     }

    @Get(':campaignId')
    async getCampaignById(@Param('campaignId') campaignId:number){
      return this.campaignService.getCampaignById(campaignId);
    }

    @Post('createCampaign')
    async createCampaign(@Body() campaignData: Campaign): Promise<any> {
      return this.campaignService.createCampaign(campaignData);
    }  

    @Put(':campaignId')
    async updateCampaign(@Param('campaignId') campaignId:number, @Body() updateCampaignDTO:updateCampaignDTO){
      updateCampaignDTO.campaignId= campaignId;
       return this.campaignService.updateCampaign(updateCampaignDTO);
     }
    
     @Delete(':campaignId')
     async softDeleteCampaign(@Param('campaignId' ) campaignId:number , @Body() DeletecampaignDTO:DeleteCampaignDTO)
     {
      DeletecampaignDTO.campaignId=campaignId;
       return this.campaignService.softDeleteCampaign(campaignId);
     }
    }
