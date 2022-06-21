import { Injectable } from '@nestjs/common';
import { creativeService } from '../creative/creative.service';
import { CreativeShareData } from './interfaces/share.interface';

@Injectable()
export class AdSharingService {
  constructor(private readonly creativeService: creativeService) { }

  async getOGdata(creativeId: number): Promise<CreativeShareData> {
    const creative = await this.creativeService.getCreativeById(creativeId);
    const data = {
      destinationURL: creative.destinationURL,
      creativeHeading: creative.creativeHeading,
      creativeDescription: creative.creativeDescription,
      CreativeImage: 'https://arpicosupercentre.com/pub/media/catalog/product/cache/926507dc7f93631a094422215b778fe0/h/t/http18.140.132.70productsimport719715.jpg'
    }
    return data;
  }
}
