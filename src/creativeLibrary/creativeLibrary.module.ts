import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreativeLibrary } from './creativeLibrary.entity';
import { creativeLibraryController } from './creativeLibrary.controller';
import { creativeLibraryService } from './creativeLibrary.service';



@Module({
    imports : [TypeOrmModule.forFeature([CreativeLibrary])
    
],
    controllers: [creativeLibraryController],
    providers: [creativeLibraryService],
    exports:[creativeLibraryService]
})
export class creativeLibraryModule {}