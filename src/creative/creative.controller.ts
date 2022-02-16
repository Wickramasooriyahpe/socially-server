import { Body,Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import path from 'path/posix';
import { Creative } from './creative.entity';
import { creativeService } from './creative.service';
import { CreativeCreationDTO } from './creativeCreation.dto';
import { DeleteCreativeDTO } from './deleteCreativeDTO.dto';
import { UpdateCreativeDTO } from './updateCreativeDTO.dto';
import { Campaign } from 'src/campaign/campaign.entity';
import {getConnection} from "typeorm";
import { CreativeDTO } from './creativeDTO';

@Controller('creative')
export class creativeController {
    constructor(private readonly creativeService : creativeService){}

    @Get()
    getAllCreatives(){
         return this.creativeService.findAll();
     }

     @Get(':creativeId')
     async getCreativeById(@Param('creativeId') creativeId:number){
       return this.creativeService.getCreativeById(creativeId);
     }

//Get all creatives for a particuler 
     @Get(':campID')
     async findAllCreatives(@Param('campID') campID:number){
      
      const AD = await getConnection()
    .createQueryBuilder()
    .select("Creative")
    .from(Creative,"Creative")
    .where("Creative.campID = :campID", { campID: campID })
    .getMany();

    return AD;
     }

    
     @Post('createCreative')
    async createCreative(@Body() creativeData: Creative): Promise<any> {
     
      return this.creativeService.createCreative(creativeData);
    }  
    
    @Put(':creativeId')
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

     @Delete(':creativeId')
     async softDeleteCreative(@Param('creativeId' ) creativeId:number , @Body() DeleteCreativeDTO:DeleteCreativeDTO)
     {
       DeleteCreativeDTO.creativeId=creativeId;
       return this.creativeService.softDeleteCreative(creativeId);
     }

    }
