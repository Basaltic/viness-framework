import { createModule } from '@viness/react'
import { CounterStore } from './store/counter.store'
import { TestService } from './services/test.service'

export const dashboardModule = createModule({
    providers: [CounterStore, TestService]
})
