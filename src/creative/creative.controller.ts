import { Body,Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import path from 'path/posix';
import { Creative } from './creative.entity';
import { creativeService } from './creative.service';
import { CreativeCreationDTO } from './creativeCreation.dto';
import { DeleteCreativeDTO } from './deleteCreativeDTO.dto';
import { UpdateCreativeDTO } from './updateCreativeDTO.dto';
import { Campaign } from 'src/campaign/campaign.entity';
import {getConnection} from "typeorm";
import { CreativeDTO } from './creativeDTO';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('creative')

export class creativeController {
    constructor(private readonly creativeService : creativeService){}

    // @Get()
    // getAllCreatives(){
    //      return this.creativeService.findAll();
    //  }

     @Get('get-one-creative/:creativeId')
     async getCreativeById(@Param('creativeId') creativeId:number){
       return this.creativeService.getCreativeById(creativeId);
     }

    //Get all creatives for a particuler campaign
     @Get(':campID')
     async findAllCreatives(@Param('campID') campID:number){
      
       return await this.creativeService.findallcreatives(campID);

   
     }

   // Create Creative 
     @Post(':campID')
     @UseGuards(JwtAuthGuard)
     async createCreative(@Body() creativeData: Creative,@Param('campID') campaignId:number,@Request() req): Promise<any> {
     // console.log("campaign ID = ",campaignId)
     creativeData.campID= campaignId;
      return this.creativeService.createCreative(creativeData);
    }  
    
    @Put(':creativeId')
    @UseGuards(JwtAuthGuard)
    async updateCreative(@Param('creativeId') creativeId:number, @Body() updateCreativeDTO:UpdateCreativeDTO){
       updateCreativeDTO.creativeId= creativeId;
       return this.creativeService.UpdateCreative(updateCreativeDTO);
     }

    /* @Delete(':creativeId')
     @HttpCode(204)
     deleteCreative(@Param('creativeId') creativeId:number,@Body() DeleteCreativeDTO:DeleteCreativeDTO){
       DeleteCreativeDTO.creativeId=creativeId;
         return this.creativeService.deleteCreative(creativeId);
        // if(!this.creativeService.deleteCreative(creativeId)){
             // throw new NotFoundException('Advertiser does not exist')
        //  }
     }
     @Delete('softD/:creativeId')
     @HttpCode(204)
     deleteCategory(@Param('creativeId') creativeId:number,@Body() DeleteCreativeDTO:DeleteCreativeDTO){
       DeleteCreativeDTO.creativeId=creativeId;
         return this.creativeService.deleteCategory(creativeId);
        // if(!this.creativeService.deleteCreative(creativeId)){
             // throw new NotFoundException('Advertiser does not exist')
        //  }
     }*/

     // soft delete creative
     @Delete(':creativeId')
     async softDeleteCreative(@Param('creativeId' ) creativeId:number , @Body() DeleteCreativeDTO:DeleteCreativeDTO)
     {
       DeleteCreativeDTO.creativeId=creativeId;
       return this.creativeService.softDeleteCreative(creativeId);
     }

    }
