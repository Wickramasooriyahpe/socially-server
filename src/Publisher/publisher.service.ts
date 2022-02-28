import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewPublisherDto } from './newPublisher.dto';
import { PublisherDto } from './Publisher.dto';
import { Repository } from 'typeorm';
import { toPublisherDto } from 'src/shared/mapper';
import { Publisher } from 'src/Publisher/publisher.entity';
import { PublisherMobileDto } from './publisherMobile.dto';
import { OtpDto } from './../OTP/otp.dto';
import { publisherStatus } from 'src/auth/interfaces/regisration-status.interface';
import { PublisherUpdateDto } from './publisherUpdate.dto';
import { PublisherCreateDto } from './publisherCreate.dto';

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>
    ){}

    async findOne(options?: object):Promise<PublisherDto>{
        const publisher = await this.publisherRepository.findOne(options)
        return toPublisherDto(publisher)
    }

        async findPublisherStatus({phoneNumber}:PublisherMobileDto):Promise<publisherStatus>{
            const publisher = await this.publisherRepository.findOne({where:{phoneNumber}})

            if(!publisher){
                let status:publisherStatus={
                    IsNewUser:true
                }
                return status;
            }else{
               let status:publisherStatus ={
                    IsNewUser:false
                }
                return status;
            }
        }

        async findByPublisherPayload({phoneNumber}:any):Promise<PublisherDto>{
            return await this.findOne({
                where : {phoneNumber}
            })
        }

       async findByLogin({phoneNumber,otp}:OtpDto):Promise<PublisherDto>{
        const publisher = await this.publisherRepository.findOne({where:{phoneNumber}})
        if(!(otp === publisher.otp)){
            throw new HttpException('Wrong OTP',HttpStatus.UNAUTHORIZED)
        }
        return publisher;
        }
    async createPublisher(newpublisherDto:NewPublisherDto)
    {
        const {phoneNumber,otp} = newpublisherDto;

            const publisher : Publisher = await this.publisherRepository.create({userName:" ",phoneNumber,otp});
            await this.publisherRepository.save(publisher);
            return toPublisherDto(publisher);
    }

    async updatePublisher(publisherUpdateDto:PublisherUpdateDto){
        const{phoneNumber,otp}=publisherUpdateDto
         const publisher = await this.findByPublisherPayload(publisherUpdateDto)
         publisher.otp = otp
         this.publisherRepository.save(publisher)
    }

    async createVerifiedPublisher(publisherCreateDto:PublisherCreateDto):Promise<PublisherDto>{
        const{phoneNumber,userName,otp} = publisherCreateDto
        const publisher = await this.publisherRepository.findOne({where:{phoneNumber}})
        if(!(otp === publisher.otp)){
            throw new HttpException('Wrong OTP',HttpStatus.UNAUTHORIZED)
        }
        publisher.userName = userName
        this.publisherRepository.save(publisher)
        return toPublisherDto(publisher)
    }
}