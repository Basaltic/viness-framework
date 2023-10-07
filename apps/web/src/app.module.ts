import { StoreModule } from '@viness/react';
import { AppRouteModule } from './routes/routes.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { Module } from '@viness/core';

@Module({
    imports: [AppRouteModule, StoreModule, DashboardModule]
})
export class AppModule {}
