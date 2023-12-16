import { IVinessUIStore } from '@viness/react';

export interface CounterState {
    count: number;
    selectedIds: Record<string, any>;
}
export const defaultCountareState: CounterState = {
    count: 0,
    selectedIds: {}
};

export type ICounterStore = IVinessUIStore<CounterState> & {
    undo(): void;
    redo(): void;
    increase(): void;
    decrease(): void;
    select(id: string): void;
    deselect(id: string): void;
};
