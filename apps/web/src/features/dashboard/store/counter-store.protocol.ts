import { createInjectDecorator } from '@viness/core';
import { IVinessUIStore, useResolve } from '@viness/react';

export interface CounterState {
    count: number;
    selectedIds: Record<string, any>;
}
export const defaultCountareState: CounterState = {
    count: 0,
    selectedIds: {}
};

export type ICounterStore = IVinessUIStore<CounterState>;
export const ICounterStore = createInjectDecorator<ICounterStore>('counter-store');

export const useCounterStore = () => useResolve<ICounterStore>(ICounterStore);

//// --- Actions

export interface ICouterActions {
    undo(): void;
    redo(): void;
    increase(): void;
    decrease(): void;
    select(id: string): void;
    deselect(id: string): void;
}

export const ICouterActions = createInjectDecorator<ICouterActions>('ICouterActions');
export const useCounterActions = () => useResolve<ICouterActions>(ICouterActions);
