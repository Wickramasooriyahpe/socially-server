import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignModule } from './campaign/campaign.module';
//import { config } from 'process';
import { Connection } from 'typeorm';
import config from 'ormconfig';
import { creativeModule } from './creative/creative.module';
import { MulterModule } from '@nestjs/platform-express';
import { creativeLibraryModule } from './creativeLibrary/creativeLibrary.module';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './Mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './Payments-stripe/stripe.module';
import { CreativePreviewModule } from './creative-preview/creative-preview.module';
import { ConversionController } from './ad-sharing/conversion.controller';
import { ConversionModule } from './ad-sharing/conversion.module';
import { PublisherTransactionModule } from './publisher-transaction/publisher-transaction.module';
import { uploadMediaModule } from './UploadMedia/media.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TransactionModule } from './transaction/transaction.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { PublisherModule } from './Publisher/publisher.module';
import { AdvertiserTransactionModule } from './advertiser-transaction/advertiser-transaction.module';

@Dependencies(Connection)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    campaignModule,
    creativeModule,
    creativeLibraryModule,
    AdvertiserModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
    MailModule,
    StripeModule,
    CreativePreviewModule,
    ConversionModule,
    PublisherTransactionModule,
    PublisherModule,
    DashboardModule,
    TransactionModule,
    FeedbacksModule,
    AdvertiserTransactionModule,
  ],
  controllers: [AppController, ConversionController],
  providers: [AppService],
})
export class AppModule {

}
