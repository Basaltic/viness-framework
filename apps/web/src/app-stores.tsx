import { app } from './app'
import { CounterStore } from './features/dashboard/store/counter.store'

// stores
export const ICounterStore = app.stores.bind(CounterStore)

// services