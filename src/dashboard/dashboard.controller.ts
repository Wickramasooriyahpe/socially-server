import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/admin')
  getAdminDashboardValues() {
    return this.dashboardService.getAdminDashboardValues();
  }

  @Get('/admin/campaigns')
  getAllCampaign() {
    return this.dashboardService.getAllCampaign();
  }

  @Get('/admin/creatives')
  getAllCreatives() {
    return this.dashboardService.getAllCreatives();
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
