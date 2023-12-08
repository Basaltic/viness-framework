import { Inject } from '@viness/core';
import { CounterStore } from '../store/counter-store';

export class CounterEffects {
    constructor(@Inject(CounterStore) private counterStore: CounterStore) {}

    async increase() {
        this.counterStore.increase();
    }
}
