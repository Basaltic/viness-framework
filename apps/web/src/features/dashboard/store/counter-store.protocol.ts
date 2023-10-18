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

export type ICounterStore = IVinessUIStore<CounterState> & {
    undo(): void;
    redo(): void;
    increase(): void;
    decrease(): void;
    select(id: string): void;
    deselect(id: string): void;
};
export const ICounterStore = createInjectDecorator<ICounterStore>('counter-store');

export const useCounterStore = () => useResolve<ICounterStore>(ICounterStore);

//// --- Effects

export interface ICouterEffects {}

export const ICouterEffects = createInjectDecorator<ICouterEffects>('ICouterEffects');
export const useCounterEffects = () => useResolve<ICouterEffects>(ICouterEffects);
