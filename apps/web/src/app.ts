import { createApp } from '@viness/react'
import { CounterStore, ICounterStore } from './features/dashboard/store/counter.store'

export const app = createApp()

app.register(ICounterStore, CounterStore)
