import { ICounterStore } from '../../../app-stores'
import { CounterStore } from '../store/counter.store'

export class CounterEffects {
    constructor(@ICounterStore private counterStore: CounterStore) {}

    async increase() {
        this.counterStore.increase()
    }
}
