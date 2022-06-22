import { Creative } from '../creative/creative.entity';
import { creativeService } from '../creative/creative.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherTransactionService } from './publisher-transaction.service';
import { PublisherTransactionController } from './publisher-transaction.controller';
import { PublisherTransaction } from './publisher-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherTransaction, Creative])],
  controllers: [PublisherTransactionController],
  providers: [PublisherTransactionService, creativeService],
  exports: [PublisherTransactionService]
})
export class PublisherTransactionModule { }
