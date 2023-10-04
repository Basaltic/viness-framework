import { Module, StoreModule, createModule } from '@viness/react';
import { AppRouteModule } from './routes/routes.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

@Module({
    imports: [AppRouteModule, StoreModule, DashboardModule]
})
export class AppModule {}
