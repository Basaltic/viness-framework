import { IVinessUIStore, useResolve, createToken } from '@viness/react'

export interface CounterState {
    count: number
    selectedIds: Record<string, any>
}
export const defaultCountareState: CounterState = {
    count: 0,
    selectedIds: {}
}

export type ICounterStore = IVinessUIStore<CounterState>
export const ICounterStore = createToken<ICounterStore>('counter-store')

export const useCounterStore = () => useResolve(ICounterStore)

//// --- Actions

export interface ICouterActions {
    undo(): void
    redo(): void
    increase(): void
    decrease(): void
    select(id: string): void
    deselect(id: string): void
}

export const ICouterActions = createToken<ICouterActions>('ICouterActions')
export const useCounterActions = () => useResolve(ICouterActions)
