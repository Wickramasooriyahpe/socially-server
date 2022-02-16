

import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Advertiser } from './advertiser.entity';
import { AdvertiserService } from './advertiser.service';
import { AdvertiserCreateDto } from './AdvertiserCreate.dto';
import { AdvertiserSearchDto } from './AdvertiserSearch.dto';
import { AdvertiserUpdateDto } from './AdvertiserUpdate.dto';

@Controller('advertiser')
export class AdvertiserController {
    constructor(private readonly advertiserService : AdvertiserService){}

    // @Get()
    // getAllAdvertisers(){
    //     return this.advertiserService.getAll();
    // }

    // @Get(':id')
    // getAdvertiserById(@Param('id') id:number){
    //     return this.advertiserService.getAdvertiserById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createAdvertiser(@Body() advertiserCreateDto : AdvertiserCreateDto):Promise<Advertiser>{
    //     return this.advertiserService.createAdvertiser(advertiserCreateDto);
    // }

    // @Put(':id')
    // updateAdvertiser(@Param('id') id:number, @Body() advertiserUpdateDto:AdvertiserUpdateDto){
    //     advertiserUpdateDto.id = id;
    //     return this.advertiserService.updateAdvertiser(advertiserUpdateDto);
    // }

    // @Delete(':id')
    // @HttpCode(204)
    // deleteAdvertiser(@Param('id') id:number){
    //     return this.advertiserService.deleteAdvertiser(id);
    //     // if(!this.advertiserService.deleteAdvertiser(id)){
    //     //     throw new NotFoundException('Advertiser does not exist')
    //     // }
    // }


}
