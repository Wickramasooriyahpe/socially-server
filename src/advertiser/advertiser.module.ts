import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './advertiser.entity';
import { AdvertiserService } from './advertiser.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports : [MailModule,TypeOrmModule.forFeature([Advertiser])],
    controllers: [AdvertiserController],
    providers: [AdvertiserService],
    exports:[AdvertiserService]
})
export class AdvertiserModule {}
