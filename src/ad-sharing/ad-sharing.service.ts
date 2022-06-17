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
      CreativeImage: 'https://iili.io/XbGhEg.jpg" alt="XbGhEg.jpg" border="0"'
    }
    return data;
  }
}
