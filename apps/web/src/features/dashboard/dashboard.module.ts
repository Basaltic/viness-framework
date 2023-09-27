import { createModule } from '@viness/react'
import { CounterActions } from './store/counter-store'
import { Test2Service, TestService } from './services/test.service'

export const dashboardModule = createModule({
    providers: [CounterActions, TestService, Test2Service]
})
