import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';
import { Advertiser } from 'src/Advertiser/advertiser.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/Advertiser/advertiser.module';
import { AdvertiserService } from 'src/Advertiser/advertiser.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports : [MailModule,AdvertiserModule,TypeOrmModule.forFeature([Campaign,Advertiser]),AuthModule],
    controllers: [campaignController],
    providers: [campaignService,AdvertiserService],
    exports:[campaignService]
})
export class campaignModule {}
