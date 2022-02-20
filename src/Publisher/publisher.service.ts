import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherCreateDto } from './publisherCreateDto';
import { PublisherDto } from './PublisherDto';
import { Repository } from 'typeorm';
import { toPublisherDto } from 'src/shared/mapper';
import { Publisher } from 'src/Publisher/publisher.entity';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>
    ){}

    async createPublisher(publisherDto:PublisherCreateDto):Promise<PublisherDto>
    {
        const {userName, mobileNumber} = publisherDto;

        //check if user already registered
        const userInDB = await this.publisherRepository.findOne(
            {where: {mobileNumber}}
        );
            if(userInDB){
                throw new HttpException('Publisher already exist', HttpStatus.BAD_REQUEST)
            }
            const publisher : Publisher = await this.publisherRepository.create({userName,mobileNumber});
            await this.publisherRepository.save(publisher);
            return toPublisherDto(publisher);
    }
}