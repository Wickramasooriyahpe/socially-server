import { Controller, Get, Param, Post, Put, Query, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreativePreviewService } from './creative-preview.service';

@Controller('creative-preview')
export class CreativePreviewController {
    constructor(private readonly creativeService : CreativePreviewService){}

    @Get()
    getAllCreatives(){
        return this.creativeService.findAll();
    }

    @Get(':creativeId')
    async getCreativeById(@Param('creativeId') creativeId:number){
        return this.creativeService.getCreativeById(creativeId);
    }
}
