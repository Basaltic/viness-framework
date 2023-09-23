import { Module, createModule } from '@viness/react'
import { CounterStoreImpl } from './store/counter-store'
import { Test2Service, TestService } from './services/test.service'

@Module({
    providers: [CounterStoreImpl, TestService, Test2Service]
})
export class DashboardModule {}
