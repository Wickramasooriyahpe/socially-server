import { Publisher } from '../Publisher/publisher.entity';
import { Module } from '@nestjs/common';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { creativeService } from '../creative/creative.service';
import { creativeModule } from '../creative/creative.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creative } from '../creative/creative.entity';
import { Conversion } from './conversion.entity';

@Module({
    imports: [creativeModule, TypeOrmModule.forFeature([Conversion, Publisher, Creative])],
    controllers: [ConversionController],
    providers: [ConversionService, creativeService],
    exports: [ConversionService]
})

export class ConversionModule { }

