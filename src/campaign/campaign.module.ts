import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/Advertiser/advertiser.module';
import { AdvertiserService } from 'src/Advertiser/advertiser.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { StripeModule } from 'src/Payments-stripe/stripe.module';
import { StripeService } from 'src/Payments-stripe/stripe.service';

@Module({
    imports : [MailModule,StripeModule,TypeOrmModule.forFeature([Campaign,Advertiser]),AuthModule],
    controllers: [campaignController],
    providers: [campaignService, StripeService],
    exports:[campaignService]
})
export class campaignModule { }
