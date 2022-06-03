import { Module } from '@nestjs/common';
import { CreativePreviewService } from './creative-preview.service';
import { CreativePreviewController } from './creative-preview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creative } from '../Creative/creative.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';

@Module({
  imports : [AuthModule,AdvertiserModule,TypeOrmModule.forFeature([Creative])],
  providers: [CreativePreviewService],
  controllers: [CreativePreviewController]
})
export class CreativePreviewModule {}
