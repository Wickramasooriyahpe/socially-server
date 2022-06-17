import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creative } from '../creative/creative.entity';

@Injectable()
export class CreativePreviewService {
  constructor(
    @InjectRepository(Creative)
    private creativeRepository: Repository<Creative>,
  ) { }

  //gett all creatives
  async findAll(): Promise<Creative[]> {
    return await this.creativeRepository.find();
  }

  //get a creative by id
  async getCreativeById(creativeId: number): Promise<Creative> {
    const creative = await this.creativeRepository.findOne(
      creativeId, {
      withDeleted: true
    }
    );
    if (creative) {
      return creative;
    }
  }

}
