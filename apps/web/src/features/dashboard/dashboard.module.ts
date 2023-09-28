import { createModule } from '@viness/react'
import { CounterActions } from './store/counter-store'
import { Test2Service, TestService } from './services/test.service'
import { CounterStore, ICounterStore } from './store/counter-store.protocol'

export const dashboardModule = createModule({
    providers: [
        {
            provide: ICounterStore,
            useClass: CounterStore
        },
        CounterActions,
        TestService,
        Test2Service
    ]
})
