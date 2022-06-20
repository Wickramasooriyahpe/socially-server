//import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './entities/advertiser.entity';
import { AdvertiserService } from './advertiser.service';
import { MailModule } from '../Mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
    imports: [MailModule, TypeOrmModule.forFeature([Advertiser])],
    controllers: [AdvertiserController],
    providers: [AdvertiserService,MailService],
    exports: [AdvertiserService]
})
export class AdvertiserModule {}

