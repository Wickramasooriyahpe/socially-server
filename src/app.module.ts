import { Dependencies, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../ormconfig'; 
import { Connection } from 'typeorm';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { AuthModule } from './auth/auth.module';

@Dependencies(Connection)
@Module({
  imports: [TypeOrmModule.forRoot(config), AdvertiserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

