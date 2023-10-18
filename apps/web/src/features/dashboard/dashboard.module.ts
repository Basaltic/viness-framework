import { Module } from '@viness/core';
import { CounterEffects, CounterStore } from './store/counter-store';

@Module({
    providers: [CounterStore, CounterEffects]
})
export class DashboardModule {}
