import { createModule } from '@viness/react'
import { CounterStoreImpl } from './store/counter-store'
import { Test2Service, TestService } from './services/test.service'

export const dashboardModule = createModule({
    providers: [CounterStoreImpl, TestService, Test2Service]
})
