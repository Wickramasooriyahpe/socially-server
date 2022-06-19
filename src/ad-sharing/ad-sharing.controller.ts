import { Query, Controller, Get, Render, UseGuards, Request, Req, Headers } from '@nestjs/common';
import { AdSharingService } from './ad-sharing.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('share')
export class AdSharingController {
    constructor(private readonly adSharingService: AdSharingService) { }
    @Get()
    // @UseGuards(JwtAuthGuard)
    @Render('index')
    public async getHTMLPage(@Query() query: { creative_id: number }, @Req() req: Request, @Headers() headers) {
        const host = headers.host
        const url = req.url;
        const fullUrl = (`http://${host}${url}`)
        const data = await this.adSharingService.getOGdata(query.creative_id);
        const { creativeHeading, creativeDescription, CreativeImage, destinationURL } = data
        console.log(destinationURL)
        return { creativeHeading, creativeDescription, CreativeImage, destinationURL, fullUrl }
    }
}
// @Request() req
// console.log(req.user.userId)