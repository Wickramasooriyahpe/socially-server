import { PublisherTransactionService } from '../publisher-transaction/publisher-transaction.service';
import { Conversion } from './conversion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { creativeService } from '../creative/creative.service';
import { CreativeShareData } from './interfaces/share.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConversionService {
  constructor(@InjectRepository(Conversion) private conversionRepository: Repository<Conversion>, private readonly creativeService: creativeService, private readonly publisherTransactionService: PublisherTransactionService) { }

  async getOGdata(creativeId: number): Promise<CreativeShareData> {
    const creative = await this.creativeService.getCreativeById(creativeId);
    const data = {
      destinationURL: creative.destinationURL,
      creativeHeading: creative.creativeHeading,
      creativeDescription: creative.creativeDescription,
      CreativeImage: 'https://i.ibb.co/BsKtkVf/http18-140-132-70productsimport719715.jpg'
    }
    return data;
  }

  async conversionData(creativeId: number, publisherId: number, visitorId: string) {
    const date = new Date().toLocaleString()
    await this.conversionRepository.save({ creativeId, publisherId, visitorId, date })
    await this.publisherTransactionService.earning(publisherId, creativeId, date)
  }
}
