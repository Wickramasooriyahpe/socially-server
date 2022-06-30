import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertiser } from '../advertiser/advertiser.entity';
import { Creative } from '../creative/creative.entity';
import { Campaign } from '../campaign/campaign.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Transactions } from '../transaction/entities/transactions.entity';

import { Feedback } from '../feedbacks/entities/feedback.entity';
import { Conversion } from 'src/ad-sharing/conversion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Advertiser,
      Creative,
      Campaign,
      Publisher,
      Transactions,
      Conversion,
      Feedback,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
