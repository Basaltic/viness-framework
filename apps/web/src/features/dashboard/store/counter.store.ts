import { UIStore } from '@viness/react'

interface CounterState {
    count: number
    selectedIds: Record<string, any>
}

const defaultCountareState: CounterState = {
    count: 0,
    selectedIds: {}
}

export class CounterStore extends UIStore<CounterState> {
    constructor() {
        super(defaultCountareState, 'counter-store')
    }

    increase() {
        this.setState((s) => {
            s.count += 1
        })
    }

    decrease() {
        this.setState((s) => {
            s.count -= 1
        })
    }

    select(id: string) {
        this.setState((s) => {
            s.selectedIds[id] = 1
        })
    }

    deselect(id: string) {
        this.setState((s) => {
            delete s.selectedIds[id]
        })
    }
}
