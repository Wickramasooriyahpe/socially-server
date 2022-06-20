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
import { CreativePreviewModule } from './creative-preview/creative-preview.module';
import { AdSharingController } from './ad-sharing/ad-sharing.controller';
import { AdSharingService } from './ad-sharing/ad-sharing.service';
import { AdSharingModule } from './ad-sharing/ad-sharing.module';
import { PublisherTransactionModule } from './publisher-transaction/publisher-transaction.module';

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
    CreativePreviewModule,
    AdSharingModule,
    PublisherTransactionModule
  ],
  controllers: [AppController, AdSharingController],
  providers: [AppService, AdSharingService],
})
export class AppModule {

}
