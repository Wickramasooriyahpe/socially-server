import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { campaignController } from './campaign.controller';
import { campaignService } from './campaign.servise';
import { Campaign } from './campaign.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Campaign])],
    controllers: [campaignController],
    providers: [campaignService],
    exports:[campaignService]
})
export class campaignModule {}
