//import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './advertiser.entity';
import { AdvertiserService } from './advertiser.service';
import { MailModule } from 'src/mail/mail.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from 'src/Payments-stripe/stripe.module';
import { StripeService } from 'src/Payments-stripe/stripe.service';
import { MailService } from '../mail/mail.service';

@Module({
    imports : [MailModule,StripeModule,ConfigModule,TypeOrmModule.forFeature([Advertiser])],
    controllers: [AdvertiserController],
    providers: [AdvertiserService,StripeService ,ConfigService,MailService],
    exports:[AdvertiserService]

})
export class AdvertiserModule {}

