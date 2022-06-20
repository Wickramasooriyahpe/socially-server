import { Module } from '@nestjs/common';
import { AdSharingController } from './ad-sharing.controller';
import { AdSharingService } from './ad-sharing.service';
import { creativeService } from './../creative/creative.service';
import { creativeModule } from '../creative/creative.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creative } from '../creative/creative.entity';

@Module({
    imports: [creativeModule, TypeOrmModule.forFeature([Creative])],
    controllers: [AdSharingController],
    providers: [AdSharingService, creativeService],
    exports: [AdSharingService]
})

export class AdSharingModule { }

