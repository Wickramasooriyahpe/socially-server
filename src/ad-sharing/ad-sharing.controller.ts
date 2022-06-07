import { Body, Controller, Get, Render } from '@nestjs/common';
import { AdSharingService } from './ad-sharing.service';
@Controller('share')
export class AdSharingController {
    constructor(private readonly adSharingService:AdSharingService){}
    @Get('')
    @Render('index')
    root(){
        const{title,description,image,url} = this.adSharingService.getOGdata();
        return {title,description,image,url}
    }
}
