import { Module } from '@nestjs/common';
import { CreativePreviewService } from './creative-preview.service';
import { CreativePreviewController } from './creative-preview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creative } from '../creative/creative.entity';
import { AuthModule } from '../auth/auth.module';
import { AdvertiserModule } from '../advertiser/advertiser.module';

@Module({
  imports: [AuthModule, AdvertiserModule, TypeOrmModule.forFeature([Creative])],
  providers: [CreativePreviewService],
  controllers: [CreativePreviewController]
})
export class CreativePreviewModule { }
