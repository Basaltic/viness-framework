import { Module } from '@viness/core';
import { CounterActions } from './store/counter-store';
import { couterStateProvider } from './store/counter-store.protocol';

@Module({
    providers: [couterStateProvider, CounterActions]
})
export class DashboardModule {}
