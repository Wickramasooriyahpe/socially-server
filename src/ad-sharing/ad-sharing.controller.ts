import { Controller, Get, Render } from '@nestjs/common';

@Controller('ad-sharing')
export class AdSharingController {
    @Get(':id')
    @Render('index')
    public async 
}
