import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { creativeController } from './creative.controller';
import { creativeService } from './creative.service';
import { Creative } from './creative.entity';
import { AuthModule } from '../auth/auth.module';
import { AdvertiserModule } from '../advertiser/advertiser.module';

@Module({
    imports: [AuthModule, AdvertiserModule, TypeOrmModule.forFeature([Creative])],
    controllers: [creativeController],
    providers: [creativeService],
    exports: [creativeService]
})
export class creativeModule { }
