import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Campaigns')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('campaign')
  getHello(): string {
    return this.appService.getHello();
  }
}
