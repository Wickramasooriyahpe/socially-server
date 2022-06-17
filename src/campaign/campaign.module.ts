import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';
import { Advertiser } from '../Advertiser/advertiser.entity';
import { AuthModule } from '../auth/auth.module';
import { AdvertiserModule } from '../Advertiser/advertiser.module';
import { AdvertiserService } from '../Advertiser/advertiser.service';
import { MailModule } from '../Mail/mail.module';

@Module({
    imports: [MailModule, AdvertiserModule, TypeOrmModule.forFeature([Campaign, Advertiser]), AuthModule],
    controllers: [campaignController],
    providers: [campaignService, AdvertiserService],
    exports: [campaignService]
})
export class campaignModule { }
