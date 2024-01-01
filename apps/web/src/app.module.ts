import { DashboardModule } from './features/dashboard/dashboard.module';
import { Module } from '@viness/core';
import { createRouterProvider } from '@viness/react';

const routerProvider = createRouterProvider({ type: 'browser' });

@Module({
    imports: [DashboardModule],
    providers: [routerProvider]
})
export class AppModule {}
