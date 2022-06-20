import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreativeLibrary } from './creativeLibrary.entity';
import { creativeLibraryController } from './creativeLibrary.controller';
import { creativeLibraryService } from './creativeLibrary.service';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';

@Module({
    imports : [AdvertiserModule, AuthModule,TypeOrmModule.forFeature([CreativeLibrary])],
    controllers: [creativeLibraryController],
    providers: [creativeLibraryService],
    exports:[creativeLibraryService]
})
export class creativeLibraryModule {}