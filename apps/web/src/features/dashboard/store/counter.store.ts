import { createDecorator, UIStore } from '@viness/react'

export const ICounterStore = createDecorator<CounterStore>('ICounterStore')

interface CounterState {
    count: number
}

const defaultCountareState: CounterState = {
    count: 0
}

export class CounterStore extends UIStore<CounterState> {
    constructor() {
        super(defaultCountareState, 'counter-store')
    }

    increase() {
        this.setState((s) => ({ count: s.count + 1 }))
    }

    decrease() {
        this.setState((s) => ({ count: s.count - 1 }))
    }
}
