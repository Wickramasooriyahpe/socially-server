import { PublisherService } from './../Publisher/publisher.service';
import { PublisherTransactionModule } from './../publisher-transaction/publisher-transaction.module';
import { PublisherTransaction } from '../publisher-transaction/publisher-transaction.entity';
import { PublisherTransactionService } from '../publisher-transaction/publisher-transaction.service';
import { Publisher } from '../Publisher/publisher.entity';
import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { creativeService } from '../creative/creative.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Creative } from '../creative/creative.entity';
import { Conversion } from './conversion.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Conversion,Creative,PublisherTransaction])],
    controllers: [ConversionController],
    providers: [ConversionService,creativeService,PublisherTransactionService],
    exports: [ConversionService]
})

export class ConversionModule { }

