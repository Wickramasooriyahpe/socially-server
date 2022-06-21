import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherTransactionService } from './publisher-transaction.service';
import { PublisherTransactionController } from './publisher-transaction.controller';
import { PublisherTransaction } from './publisher-transaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PublisherTransaction])],
  controllers: [PublisherTransactionController],
  providers: [PublisherTransactionService]
})
export class PublisherTransactionModule {}
