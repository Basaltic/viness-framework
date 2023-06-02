import { createModule } from '@viness/react'
import { ICounterStore, CounterStore } from './store/counter.store'

export const dashboardModule = createModule()

dashboardModule.register(ICounterStore, CounterStore)
