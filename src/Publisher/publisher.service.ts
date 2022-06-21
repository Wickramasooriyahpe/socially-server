import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewPublisherDto } from './newPublisher.dto';
import { PublisherDto } from './Publisher.dto';
import { Repository } from 'typeorm';
import { toPublisherDto } from '../shared/mapper';
import { Publisher } from './publisher.entity';
import { PublisherMobileNoDto } from './publisherMobile.dto';
import { OtpDto } from './../OTP/otp.dto';
import { OtpSendingStatus } from '../auth/interfaces/regisration-status.interface';
import { PublisherOtpDto } from './publisherUpdate.dto';
import { PublisherCreateDto } from './publisherCreate.dto';
import { OtpService } from './../OTP/otp.service';
var otpGenerator = require('otp-generator');

@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>, private readonly otpService: OtpService
    ) { }

    async findPublisherById(id: number): Promise<PublisherCreateDto> {
        try {
            const publisher = await this.publisherRepository.findOneOrFail(id);
            return publisher;
        }
        catch (err) {
            throw err
        }
    }

    async findOne(options?: object): Promise<PublisherDto> {
        const publisher = await this.publisherRepository.findOne(options)
        return toPublisherDto(publisher)
    }

    async sendOtp(publisherMobileNoDto: PublisherMobileNoDto): Promise<OtpSendingStatus> {
        let { phoneNumber } = publisherMobileNoDto;
        const publisher = await this.publisherRepository.findOne({ where: { phoneNumber } })
        let status: OtpSendingStatus = {
            IsOtpSend: false,
        }
        // const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, lowerCase: false, specialChars: false })

        const GeneratedOtp = Math.floor(100000 + Math.random() * 900000)
        const otp = GeneratedOtp.toString();
        const newPublisher: NewPublisherDto = {
            phoneNumber: publisherMobileNoDto.phoneNumber,
            otp
        }
        if (publisher) {
            await this.setOtp(newPublisher)
            status = {
                IsOtpSend: true
            }

        }
        else {
            try {
                await this.createPublisher(newPublisher)
                status = {
                    IsOtpSend: true
                }
            } catch (err) {
                throw new HttpException(err, HttpStatus.BAD_REQUEST)
            }
        }

        return status;
    }

    async findByPublisherPayload({ phoneNumber }: any): Promise<PublisherDto> {
        return await this.findOne({
            where: { phoneNumber }
        })
    }

    async findByLogin({ phoneNumber, otp }: OtpDto): Promise<PublisherDto> {
        const publisher = await this.publisherRepository.findOne({ where: { phoneNumber } })
        if (!(otp === publisher.otp)) {
            throw new HttpException('Wrong OTP', HttpStatus.UNAUTHORIZED)
        }
        return publisher;
    }
    async createPublisher(newpublisherDto: NewPublisherDto) {
        const { phoneNumber, otp } = newpublisherDto;

        const publisher: Publisher = await this.publisherRepository.create({ userName: "", phoneNumber, otp });
        await this.publisherRepository.save(publisher);
        return toPublisherDto(publisher);
    }

    async setOtp(publisherUpdateDto: PublisherOtpDto) {
        const { otp } = publisherUpdateDto
        const publisher = await this.findByPublisherPayload(publisherUpdateDto)
        publisher.otp = otp
        this.publisherRepository.save(publisher)
    }

    async createVerifiedPublisher(publisherCreateDto: PublisherCreateDto): Promise<PublisherDto> {
        const { phoneNumber, userName } = publisherCreateDto
        const publisher = await this.publisherRepository.findOne({ where: { phoneNumber } })

        publisher.userName = userName
        this.publisherRepository.save(publisher)
        return publisher;
    }

    async updatePublisher(userName: string, id: number): Promise<{ userName: string }> {
        const publisher = await this.findPublisherById(id);
        publisher.userName = userName;
        this.publisherRepository.save(publisher)
        return { userName: publisher.userName };
    }
}