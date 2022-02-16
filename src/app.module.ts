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
import { AdvertiserModule } from './Advertiser/advertiser.module';
import { AuthModule } from './auth/auth.module';
@Dependencies(Connection)
@Module({
  imports: [ TypeOrmModule.forRoot(config),campaignModule,creativeModule,
    creativeLibraryModule,AdvertiserModule, AuthModule,
  MulterModule.register({
    dest : './files',
  }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
