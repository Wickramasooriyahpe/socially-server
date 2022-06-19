import { Query, Controller, Get, Render, UseGuards, Request, } from '@nestjs/common';
import { AdSharingService } from './ad-sharing.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('share')
export class AdSharingController {
    constructor(private readonly adSharingService: AdSharingService) { }
    @Get()
    // @UseGuards(JwtAuthGuard)
    @Render('index')
    public async getHTMLPage(@Query() query: { creative_id: number },) {

        const data = await this.adSharingService.getOGdata(query.creative_id);
        const { creativeHeading, creativeDescription, CreativeImage, destinationURL } = data
        return { creativeHeading, creativeDescription, CreativeImage, destinationURL }
    }
}
// @Request() req
// console.log(req.user.userId)