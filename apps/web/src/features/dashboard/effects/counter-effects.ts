import { Inject } from '@viness/core';
import { counterStateToken } from '../store/counter-store.protocol';
import type { CounterState } from '../store/counter-store.protocol';

export class CounterEffects {
    constructor(@Inject(counterStateToken) private counterStore: CounterState) {}

    async increase() {}
}
