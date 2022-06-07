import { Module } from '@nestjs/common';
import { AdSharingController } from './ad-sharing.controller';
import { AdSharingService } from './ad-sharing.service';

@Module({
    imports:[],
    controllers:[AdSharingController],
    providers:[AdSharingService],
})

export class AdSharingModule{}

