import { AppRouteModule } from './routes/routes.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { Module } from '@viness/core';

@Module({
    imports: [AppRouteModule, DashboardModule]
})
export class AppModule {}
