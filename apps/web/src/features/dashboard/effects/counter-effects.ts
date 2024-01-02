import { Inject } from '@viness/core';
import { counterStateToken } from '../store/counter-store.protocol';
import type { CounterStore } from '../store/counter-store.protocol';

export class CounterEffects {
    constructor(@Inject(counterStateToken) private counterStore: CounterStore) {}

    async increase() {}
}
