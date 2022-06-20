import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';
import { Advertiser } from 'src/advertiser/entities/advertiser.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/Advertiser/advertiser.module';
import { AdvertiserService } from 'src/Advertiser/advertiser.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports : [MailModule,TypeOrmModule.forFeature([Campaign]),AuthModule],
    controllers: [campaignController],
    providers: [campaignService],
    exports:[campaignService]
})
export class campaignModule { }
