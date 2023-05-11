import { it, expect, describe } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { createVinessApp } from '../app'

import { UIStore } from '../ui-store'
import { createIdentifier } from '../identifier'

const ICounterStore = createIdentifier<CounterStore>('ICounterStore')

interface CounterState {
    count: number
}

const defaultCountareState: CounterState = {
    count: 0
}

class CounterStore extends UIStore<CounterState> {
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

describe('multiple ui store instance', () => {
    it('different instances should have different state', () => {
        const app = createVinessApp()

        app.stores.bind(CounterStore, ICounterStore)

        const counterStore1 = app.stores.get(ICounterStore)
        const counterStore2 = app.stores.get(ICounterStore, 'TEST')

        counterStore1.increase()

        expect(counterStore1.getState().count).toBe(1)
        expect(counterStore2.getState().count).toBe(0)
    })
})

describe('store hooks', () => {
    it('should increment counter 1', () => {
        const app = createVinessApp()
        app.stores.bind(CounterStore, ICounterStore)
        const counterStore = app.stores.get(ICounterStore)

        const { result } = renderHook(() => counterStore.use.count())
        act(() => {
            counterStore.increase()
        })
        expect(result.current).toBe(1)
    })

    it('should increment counter 2', () => {
        const app = createVinessApp()
        app.stores.bind(CounterStore, ICounterStore)
        const counterStore = app.stores.get(ICounterStore)

        const { result } = renderHook(() => counterStore.useState((s) => s.count))
        act(() => {
            counterStore.increase()
        })
        expect(result.current).toBe(1)
    })
})
