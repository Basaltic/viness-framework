import { createModule } from '@viness/react'
import { CounterStore } from './store/counter.store'
import { Test2Service, TestService } from './services/test.service'

export const dashboardModule = createModule({
    providers: [CounterStore, TestService, Test2Service]
})
