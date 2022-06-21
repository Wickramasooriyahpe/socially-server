import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { uploadService } from './media.service';
import { uploadController } from './media.controller';
import {avatar } from './profileImage.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';

@Module({
    imports : [AdvertiserModule,AuthModule,TypeOrmModule.forFeature([avatar])],
    controllers: [uploadController],
    providers: [uploadService ],
    exports:[uploadService ]
})
export class uploadMediaModule {}
