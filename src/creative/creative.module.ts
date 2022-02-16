import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { creativeController } from './creative.controller';
import { creativeService } from './creative.service';
import { Creative } from './creative.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Creative])],
    controllers: [creativeController],
    providers: [creativeService],
    exports:[creativeService]
})
export class creativeModule {}
