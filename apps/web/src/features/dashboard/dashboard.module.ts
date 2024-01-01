import { Module } from '@viness/core';
import { CounterActions } from './store/counter-store';
import { couterStateProvider } from './store/counter-store.protocol';
import {
    DashboardPage1RouteProvider,
    DashboardPage2RouteProvider,
    DashboardPage3RouteProvider,
    DashboardRouteProvider,
    RootRouteProvider
} from './routes.protocol';

@Module({
    providers: [
        RootRouteProvider,
        DashboardRouteProvider,
        DashboardPage1RouteProvider,
        DashboardPage2RouteProvider,
        DashboardPage3RouteProvider,
        couterStateProvider,
        CounterActions
    ]
})
export class DashboardModule {}
