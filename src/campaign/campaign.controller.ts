import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { Campaign } from './campaign.entity';
import { campaignService } from './campaign.servise';
import { campaignCreationDTO } from './campaignCreation.dto';
import { DeleteCampaignDTO } from './deleteCampaignDTO.dto';
import { updateCampaignDTO } from './updateCampaign.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdvertiserDto } from 'src/advertiser/advertiserDto';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
//import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard'; 
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

    // @Post('createCampaign')
    // @UseGuards(AuthGuard())
    // async createCampaign(@Body() campaignData: Campaign, @Req() req : any): Promise<any> {
    //   const Advertiser = <AdvertiserDto>req.Advertiser;
    //   return this.campaignService.createCampaign(campaignData);
    // }  
    
    @Post('createCampaign')
    @UseGuards(JwtAuthGuard)
    async createCampaign(@Body() campaignData: Campaign): Promise<any> {
      return this.campaignService.createCampaign(campaignData);
    }
     
   

    @Put(':campaignId')
    @UseGuards(JwtAuthGuard)
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
