import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';
import { Advertiser } from '../advertiser/advertiser.entity';
import { AuthModule } from '../auth/auth.module';
import { AdvertiserModule } from '../advertiser/advertiser.module';
import { AdvertiserService } from '../advertiser/advertiser.service';
import { MailModule } from '../Mail/mail.module';

@Module({
    imports: [MailModule, AdvertiserModule, TypeOrmModule.forFeature([Campaign, Advertiser]), AuthModule],
    controllers: [campaignController],
    providers: [campaignService, AdvertiserService],
    exports: [campaignService]
})
export class campaignModule { }
