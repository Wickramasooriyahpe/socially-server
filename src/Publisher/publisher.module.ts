import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { OtpService } from '../OTP/otp.service';

@Module({
    imports: [TypeOrmModule.forFeature([Publisher])],
    controllers: [PublisherController],
    providers: [PublisherService, OtpService],
    exports: [PublisherService]
})

export class PublisherModule { }
