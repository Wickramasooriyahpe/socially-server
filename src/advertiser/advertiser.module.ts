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
import { AdvertiserTransactionService } from 'src/advertiser-transaction/advertiser-transaction.service';
import { AdvertiserTransactionModule } from 'src/advertiser-transaction/advertiser-transaction.module';
import { AdvertiserTransaction } from 'src/advertiser-transaction/advertiser-transaction.entity';

@Module({
    imports : [MailModule,StripeModule,AdvertiserTransactionModule,ConfigModule,TypeOrmModule.forFeature([Advertiser, AdvertiserTransaction])],
    controllers: [AdvertiserController],
    providers: [AdvertiserService,StripeService ,ConfigService,MailService,AdvertiserTransactionService],
    exports:[AdvertiserService,AdvertiserTransactionService]

})
export class AdvertiserModule {}

