import { Query, Controller, Get, Render, Res, Req, Headers } from '@nestjs/common';
import { ConversionService } from './conversion.service';
import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';

@Controller('share')
export class ConversionController {
    constructor(private readonly adSharingService: ConversionService) { }
    @Get()
    @Render('index')
    public async getHTMLPage(@Query() query: { creative_id: number, user_id: number }, @Req() req: Request, @Headers() headers, @Res({ passthrough: true }) response: Response) {

        if (req.cookies['id']) {
            console.log('Welcome Back', req.cookies['id'])
            return;
        }

        const id: string = uuid();
        response.cookie('id', id, {
            maxAge: 360000,
            httpOnly: true
        })
        console.log('welcome ', id)
        await this.adSharingService.conversionData(query.creative_id, query.user_id, id)



        const host = headers.host
        const url = req.url;
        const fullUrl = (`http://${host}${url}`)
        const data = await this.adSharingService.getOGdata(query.creative_id);
        const { creativeHeading, creativeDescription, CreativeImage, destinationURL } = data
        return { creativeHeading, creativeDescription, CreativeImage, destinationURL, fullUrl }
    }
}