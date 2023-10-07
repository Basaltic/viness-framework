import { Module } from '@viness/core';
import { CounterActions, CounterStore } from './store/counter-store';
import { counterHandlers } from './store';

@Module({
    providers: [CounterStore, CounterActions, ...counterHandlers]
})
export class DashboardModule {}
