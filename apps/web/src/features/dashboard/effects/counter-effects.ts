import { CounterStore } from '../store/counter-store.protocol'

export class CounterEffects {
    constructor(@CounterStore private counterStore: CounterStore) {}

    async increase() {
        this.counterStore.increase()
    }
}
