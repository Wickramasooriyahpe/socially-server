import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserTransaction } from './advertiser-transaction.entity';
import { AdvertiserTransactionController } from './advertiser-transaction.controller';
import { AdvertiserTransactionService } from './advertiser-transaction.service';

@Module({
  imports:[TypeOrmModule.forFeature([AdvertiserTransaction])],
  controllers: [AdvertiserTransactionController],
  providers: [AdvertiserTransactionService]
})
export class AdvertiserTransactionModule {}
