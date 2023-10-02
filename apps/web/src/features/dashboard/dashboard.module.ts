import { Module } from '@viness/react'
import { CounterActions, CounterStore } from './store/counter-store'
import { Test2Service, TestService } from './services/test.service'

@Module({
    providers: [CounterStore, CounterActions, TestService, Test2Service]
})
export class DashboardModule {}
