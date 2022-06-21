import { JwtAuthGuard } from './../auth/jwt.guard';
import { AdvertiserPasswordChangeDto } from './dto/advertiserPasswordChange.dto';


import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from 'src/auth/jwt.guard';
//import { UseGuards } from '@nestjs/common';
import { Advertiser } from './advertiser.entity';
import { AdvertiserService } from './advertiser.service';
import { AdvertiserCreateDto } from './dto/advertiser-create.dto';
import { AdvertiserUpdateDto } from './dto/AdvertiserUpdate.dto';

@Controller('advertiser')
export class AdvertiserController {
    constructor(private readonly advertiserService: AdvertiserService) { }

    // @Get()
    // getAllAdvertisers(){
    //     return this.advertiserService.getAll();
    // }

    @Get(':id')
    getAdvertiserById(@Param('id') id: number) {
        return this.advertiserService.getAdvertiserById(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createAdvertiser(@Body() advertiserCreateDto : AdvertiserCreateDto):Promise<Advertiser>{
    //     return this.advertiserService.createAdvertiser(advertiserCreateDto);
    // }

    // @Put()
    // @UseGuards(JwtAuthGuard)
    // update(@Param() id:number, @Body() advertiserUpdateDto:AdvertiserUpdateDto){
    //     advertiserUpdateDto.id = id;
    //     return this.advertiserService.update(id, advertiserUpdateDto);
    // }

    // @Delete(':id')
    // @HttpCode(204)
    // deleteAdvertiser(@Param('id') id:number){
    //     return this.advertiserService.deleteAdvertiser(id);
    //     // if(!this.advertiserService.deleteAdvertiser(id)){
    //     //     throw new NotFoundException('Advertiser does not exist')
    //     // }
    // }

    /*********************Profile update */
    @Get()
    async findAll(){
        const response = await this.advertiserService.findAll();
        return response;
    }
 
    // @Get(":id")
    // async findOneadvertiser(@Param() id:number){
    //     const response = await this.advertiserService.findOneadvertiser(id);
    //     return response;
    // }

    // @Put()
    // @UseGuards(JwtAuthGuard)
    //  async updat(@Param() id: number, @Body() createProfileDto: AdvertiserUpdateDto){
    //      const response = await this.advertiserService.update(id, createProfileDto);
    //      return response;
    //  }

    @Patch(":id")
    //@UseGuards(JwtAuthGuard)
    async updateData(@Param('id') id:number, @Body() advertiserUpdateDto:AdvertiserUpdateDto) {
        
        return this.advertiserService.updateData(id,advertiserUpdateDto);
    }
 
    // @Delete()
    // async Delete (@Body() id: number){
    //     const response = await this.advertiserService.remove(id);
    //     return response;
    // }

    @Put(":id")
    
    public async changePassword(@Param('id') id:number, @Body() AdvertiserPasswordChangeDto: AdvertiserPasswordChangeDto){
        return await this.advertiserService.changePassword(id,AdvertiserPasswordChangeDto);
    }


}
