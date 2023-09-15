import { createToken, IVinessUIStore } from '@viness/react'

export interface CounterState {
    count: number
    selectedIds: Record<string, any>
}

export const CounterStore = createToken<CounterStore>('CounterStore')

export interface CounterStore extends IVinessUIStore<CounterState> {
    undo(): void
    redo(): void
    increase(): void
    decrease(): void
    select(id: string): void
    deselect(id: string): void
}
