import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/admin')
  getAdminDashboardValues() {
    return this.dashboardService.getAdminDashboardValues();
  }

  @Get('/admin/campaigns/:id')
  getAllCampaign(@Param('id') id: number) {
    return this.dashboardService.getAllCampaign(id);
  }

  @Get('/admin/creatives/:id')
  getAllCreatives(@Param('id') id: number) {
    return this.dashboardService.getAllCreatives(id);
  }

  @Get('/user/:id')
  getUserDashboardValues(@Param('id') id: number) {
    return this.dashboardService.getUserDashboardValues(id);
  }


  @Get('/graph/:id')
  getUserGraphsValues(@Param('id') id: number) {
    return this.dashboardService.getUserGraphValues(id);
  }
}
