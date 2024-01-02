import { Inject } from '@viness/core';
import { IUIStore, createStore, useResolve } from '@viness/react';

export interface ICounterStateValue {
    count: number;
    selectedIds: Record<string, any>;
}
export const defaultCounterState: ICounterStateValue = {
    count: 0,
    selectedIds: {}
};

export type CounterStore = IUIStore<ICounterStateValue>;

export const couterStoreProvider = createStore<ICounterStateValue>({ default: defaultCounterState });
export const counterStateToken = couterStoreProvider.token;
export const useCounterState = () => useResolve(counterStateToken);
export const ICounterStore = Inject(counterStateToken);
