import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { Campaign } from './campaign.entity';
import { campaignService } from './campaign.servise';
import { campaignCreationDTO } from './campaignCreation.dto';
import { DeleteCampaignDTO } from './deleteCampaignDTO.dto';
import { updateCampaignDTO } from './updateCampaign.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {getConnection} from "typeorm";

@Controller('campaign')
export class campaignController {
    constructor(private readonly campaignService : campaignService,
                 
      ){}

    @Get()
    getAllCampaign(){
         return this.campaignService.findAll();
     }
     //get campaigns belong to one advertiser
     @Get(':adveID')
     async findAllCreatives(@Param('adveID') adveID:number){
      
          const camp = await getConnection()
          .createQueryBuilder()
          .select("Campaign")
          .from(Campaign,"Campaign")
          .where("Campaign.adveID = :adveID", { adveID: adveID })
          .getMany();

    return camp;
     }

    @Get(':campaignId')
    async getCampaignById(@Param('campaignId') campaignId:number){
          return this.campaignService.getCampaignById(campaignId);
    }
   // Create a new Campaign
    @UseGuards(JwtAuthGuard)
    @Post('createCampaign')
    async createCampaign(@Body() campaignData: Campaign, @Request() req): Promise<any> {
          console.log(req.user.userId)
          return this.campaignService.createCampaign(req.user.userId,campaignData);
    }
     
    @Put(':campaignId')
    @UseGuards(JwtAuthGuard)
    async updateCampaign(@Param('campaignId') campaignId:number, @Body() updateCampaignDTO:updateCampaignDTO){
          console.log()
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
