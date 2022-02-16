import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { uploadService } from './media.service';
import { uploadController } from './media.controller';
import { uploadMdata } from './metaData.entity';

@Module({
    imports : [TypeOrmModule.forFeature([uploadMdata])],
    controllers: [uploadController],
    providers: [uploadService ],
    exports:[uploadService ]
})
export class creativeModule {}
